-- ============================================================
-- Supabase Migration: GitHub OAuth Comment System
-- ============================================================
-- Run this SQL in your Supabase SQL Editor AFTER the initial setup.
-- This upgrades the comments table to use GitHub authentication.
-- ============================================================

-- Add GitHub-specific columns to comments table
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS github_user_id TEXT,
  ADD COLUMN IF NOT EXISTS github_username TEXT,
  ADD COLUMN IF NOT EXISTS github_avatar_url TEXT;

-- Make author_name nullable (will be populated from GitHub)
ALTER TABLE comments ALTER COLUMN author_name DROP NOT NULL;

-- Create index on github_user_id for lookups
CREATE INDEX IF NOT EXISTS idx_comments_github_user ON comments(github_user_id);

-- ============================================================
-- Updated RPC: Add comment (GitHub authenticated)
-- ============================================================

-- Drop the OLD 4-parameter version first to avoid overload conflict
DROP FUNCTION IF EXISTS add_comment(TEXT, TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION add_comment(
  p_page_path TEXT,
  p_author_name TEXT,
  p_content TEXT,
  p_fingerprint TEXT,
  p_github_user_id TEXT DEFAULT NULL,
  p_github_username TEXT DEFAULT NULL,
  p_github_avatar_url TEXT DEFAULT NULL
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
  rate_fingerprint TEXT;
BEGIN
  clean_content := TRIM(p_content);

  -- Use GitHub username if provided, otherwise use supplied author name
  IF p_github_username IS NOT NULL AND LENGTH(TRIM(p_github_username)) > 0 THEN
    clean_author := TRIM(p_github_username);
  ELSE
    clean_author := TRIM(p_author_name);
  END IF;

  -- Validate author name length
  IF LENGTH(clean_author) < 1 OR LENGTH(clean_author) > 50 THEN
    RETURN json_build_object('success', false, 'error', '昵称长度需要在1-50个字符之间 / Name must be 1-50 characters');
  END IF;

  -- Validate content length
  IF LENGTH(clean_content) < 2 OR LENGTH(clean_content) > 2000 THEN
    RETURN json_build_object('success', false, 'error', '评论内容需要在2-2000个字符之间 / Comment must be 2-2000 characters');
  END IF;

  -- Use GitHub user ID for rate limiting if available, otherwise fingerprint
  rate_fingerprint := COALESCE(p_github_user_id, p_fingerprint);

  -- Check rate limit: 5 comments per 10 minutes
  is_allowed := check_rate_limit(rate_fingerprint, 'comment', 5, 10);
  IF NOT is_allowed THEN
    RETURN json_build_object('success', false, 'error', '评论太频繁，请稍后再试 / Too many comments, please wait');
  END IF;

  -- Insert comment
  INSERT INTO comments (
    page_path, author_name, content, ip_hash, is_visible,
    github_user_id, github_username, github_avatar_url
  ) VALUES (
    p_page_path, clean_author, clean_content, p_fingerprint, true,
    p_github_user_id, p_github_username, p_github_avatar_url
  )
  RETURNING * INTO new_comment;

  RETURN json_build_object(
    'success', true,
    'comment', json_build_object(
      'id', new_comment.id,
      'page_path', new_comment.page_path,
      'author_name', new_comment.author_name,
      'content', new_comment.content,
      'created_at', new_comment.created_at,
      'github_username', new_comment.github_username,
      'github_avatar_url', new_comment.github_avatar_url
    )
  );
END;
$$;

-- Grant permissions (must match new 7-parameter signature)
GRANT EXECUTE ON FUNCTION add_comment(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;
