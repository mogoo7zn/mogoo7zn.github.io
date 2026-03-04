-- ============================================================
-- Supabase Setup Script for Visit Counter & Comment System
-- ============================================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New query
-- ============================================================

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ========================
-- Table: page_views
-- ========================
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page_path TEXT UNIQUE NOT NULL,
  view_count BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_viewed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page views"
  ON page_views FOR SELECT USING (true);

-- ========================
-- Table: comments
-- ========================
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  author_name VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT,
  is_visible BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_comments_page_path ON comments(page_path);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible comments"
  ON comments FOR SELECT USING (is_visible = true);

-- ========================
-- Table: rate_limits
-- ========================
CREATE TABLE IF NOT EXISTS rate_limits (
  id BIGSERIAL PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  action_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
  ON rate_limits(fingerprint, action_type, created_at);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- No public read/write access (only via SECURITY DEFINER functions)

-- ========================
-- Table: admin_settings
-- ========================
CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- No public access (only via SECURITY DEFINER functions)

-- ============================================================
-- RPC Functions
-- ============================================================

-- Increment page view (atomic upsert)
CREATE OR REPLACE FUNCTION increment_page_view(p_path TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count BIGINT;
BEGIN
  INSERT INTO page_views (page_path, view_count, last_viewed_at)
  VALUES (p_path, 1, NOW())
  ON CONFLICT (page_path) DO UPDATE
  SET view_count = page_views.view_count + 1,
      last_viewed_at = NOW()
  RETURNING view_count INTO current_count;

  RETURN current_count;
END;
$$;

-- Get page view count
CREATE OR REPLACE FUNCTION get_page_views(p_path TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  count_val BIGINT;
BEGIN
  SELECT view_count INTO count_val FROM page_views WHERE page_path = p_path;
  RETURN COALESCE(count_val, 0);
END;
$$;

-- Get total site views (sum of all pages)
CREATE OR REPLACE FUNCTION get_total_views()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total BIGINT;
BEGIN
  SELECT COALESCE(SUM(view_count), 0) INTO total FROM page_views;
  RETURN total;
END;
$$;

-- Check rate limit (returns true if allowed)
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_fingerprint TEXT,
  p_action TEXT,
  p_max_count INT DEFAULT 5,
  p_window_minutes INT DEFAULT 10
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  recent_count INT;
BEGIN
  -- Clean up old entries (older than 1 hour)
  DELETE FROM rate_limits
  WHERE created_at < NOW() - INTERVAL '1 hour';

  -- Count recent actions within the window
  SELECT COUNT(*) INTO recent_count
  FROM rate_limits
  WHERE fingerprint = p_fingerprint
    AND action_type = p_action
    AND created_at > NOW() - (p_window_minutes || ' minutes')::INTERVAL;

  IF recent_count >= p_max_count THEN
    RETURN false;
  END IF;

  -- Record this action
  INSERT INTO rate_limits (fingerprint, action_type, created_at)
  VALUES (p_fingerprint, p_action, NOW());

  RETURN true;
END;
$$;

-- Add comment (with validation + rate limiting)
CREATE OR REPLACE FUNCTION add_comment(
  p_page_path TEXT,
  p_author_name TEXT,
  p_content TEXT,
  p_fingerprint TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_allowed BOOLEAN;
  new_comment comments%ROWTYPE;
  clean_author TEXT;
  clean_content TEXT;
BEGIN
  clean_author := TRIM(p_author_name);
  clean_content := TRIM(p_content);

  -- Validate author name length
  IF LENGTH(clean_author) < 1 OR LENGTH(clean_author) > 50 THEN
    RETURN json_build_object('success', false, 'error', '昵称长度需要在1-50个字符之间 / Name must be 1-50 characters');
  END IF;

  -- Validate content length
  IF LENGTH(clean_content) < 2 OR LENGTH(clean_content) > 2000 THEN
    RETURN json_build_object('success', false, 'error', '评论内容需要在2-2000个字符之间 / Comment must be 2-2000 characters');
  END IF;

  -- Check rate limit: 5 comments per 10 minutes per fingerprint
  is_allowed := check_rate_limit(p_fingerprint, 'comment', 5, 10);
  IF NOT is_allowed THEN
    RETURN json_build_object('success', false, 'error', '评论太频繁，请稍后再试 / Too many comments, please wait');
  END IF;

  -- Insert comment
  INSERT INTO comments (page_path, author_name, content, ip_hash, is_visible)
  VALUES (p_page_path, clean_author, clean_content, p_fingerprint, true)
  RETURNING * INTO new_comment;

  RETURN json_build_object(
    'success', true,
    'comment', json_build_object(
      'id', new_comment.id,
      'page_path', new_comment.page_path,
      'author_name', new_comment.author_name,
      'content', new_comment.content,
      'created_at', new_comment.created_at
    )
  );
END;
$$;

-- Admin: Delete comment (soft delete)
CREATE OR REPLACE FUNCTION admin_delete_comment(
  p_comment_id BIGINT,
  p_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash TEXT;
  target_comment comments%ROWTYPE;
BEGIN
  -- Get stored admin password hash
  SELECT value INTO stored_hash FROM admin_settings WHERE key = 'admin_password_hash';

  IF stored_hash IS NULL THEN
    RETURN json_build_object('success', false, 'error', '管理员密码未设置 / Admin password not configured');
  END IF;

  -- Verify password
  IF crypt(p_password, stored_hash) != stored_hash THEN
    RETURN json_build_object('success', false, 'error', '管理员密码错误 / Incorrect admin password');
  END IF;

  -- Check comment exists
  SELECT * INTO target_comment FROM comments WHERE id = p_comment_id;
  IF target_comment.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', '评论不存在 / Comment not found');
  END IF;

  -- Soft delete: hide the comment
  UPDATE comments SET is_visible = false WHERE id = p_comment_id;

  RETURN json_build_object('success', true, 'message', '评论已删除 / Comment deleted');
END;
$$;

-- Admin: Verify password (for login check)
CREATE OR REPLACE FUNCTION admin_verify_password(p_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT value INTO stored_hash FROM admin_settings WHERE key = 'admin_password_hash';

  IF stored_hash IS NULL THEN
    RETURN false;
  END IF;

  RETURN crypt(p_password, stored_hash) = stored_hash;
END;
$$;

-- ============================================================
-- Grant execute permissions to anonymous and authenticated users
-- ============================================================
GRANT EXECUTE ON FUNCTION increment_page_view TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_page_views TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_total_views TO anon, authenticated;
GRANT EXECUTE ON FUNCTION add_comment TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_delete_comment TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_verify_password TO anon, authenticated;
GRANT EXECUTE ON FUNCTION check_rate_limit TO anon, authenticated;

-- ============================================================
-- IMPORTANT: Set your admin password
-- ============================================================
-- Run this ONCE to set your admin password.
-- Replace 'YOUR_SECURE_PASSWORD' with your actual password:
--
-- INSERT INTO admin_settings (key, value)
-- VALUES ('admin_password_hash', crypt('YOUR_SECURE_PASSWORD', gen_salt('bf')))
-- ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
--
-- Example:
-- INSERT INTO admin_settings (key, value)
-- VALUES ('admin_password_hash', crypt('my-secret-admin-pw', gen_salt('bf')))
-- ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
-- ============================================================
