import React, { useState, useEffect, useRef } from 'react';
import { useScrollspy } from '../../../hooks/useScrollspy';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import { useAnimatedSticky } from '../../../hooks/useAnimatedSticky';
import styles from './TableOfContents.module.scss';

const TableOfContents = ({
  headings,
  activeId: externalActiveId,
  onLinkClick: externalOnLinkClick,
}) => {
  const tocContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const [internalActiveId, setInternalActiveId] = useState(headings[0]?.id || '');
  const [isClickScrolling, setIsClickScrolling] = useState(false);
  const [scrollspyOptions, setScrollspyOptions] = useState(null);

  // 使用外部传入的 activeId，如果没有则使用内部状态
  const activeId = externalActiveId !== undefined ? externalActiveId : internalActiveId;

  const headerHeight = useHeaderHeight();
  const topOffset = headerHeight + 32;

  const positionStyle = useAnimatedSticky(tocContainerRef);

  // === 初始化 scrollspy 观察配置 ===
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScrollspyOptions({
        rootMargin: `-${headerHeight}px 0px -60% 0px`,
      });
    }
  }, [headerHeight]);

  // === 收集所有需要监听的 ID（包括二级）===
  const headingIds = headings.flatMap((h) =>
    h.subsections?.length ? [h.id, ...h.subsections.map((s) => s.id)] : [h.id]
  );

  const observedId = useScrollspy(headingIds, scrollspyOptions);

  // === 当滚动触发时更新高亮 ===
  useEffect(() => {
    if (observedId && !isClickScrolling && externalActiveId === undefined) {
      setInternalActiveId(observedId);
    }
  }, [observedId, isClickScrolling, externalActiveId]);

  // === 高亮项居中滚动 ===
  useEffect(() => {
    if (!tocContainerRef.current || !activeId) return;
    const activeElement = tocContainerRef.current.querySelector(`.${styles.active}`);
    if (!activeElement) return;

    // 只有在非点击滚动状态下才自动滚动左侧栏
    // 这样可以避免点击时左侧栏位置跳动
    if (!isClickScrolling && !isHandlingClick.current) {
      const containerHeight = tocContainerRef.current.offsetHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      const scrollTo = elementTop - containerHeight / 2 + elementHeight / 2;
      tocContainerRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, [activeId, isClickScrolling]);

  // === 添加一个 ref 来跟踪是否正在处理点击滚动 ===
  const isHandlingClick = useRef(false);

  // === 点击滚动事件 ===
  const handleLinkClick = (e, headingId) => {
    e.preventDefault();

    // 防止重复点击
    if (isHandlingClick.current) return;
    isHandlingClick.current = true;

    setIsClickScrolling(true);

    const targetElement = document.getElementById(headingId);
    if (!targetElement) {
      setIsClickScrolling(false);
      isHandlingClick.current = false;
      return;
    }

    // 立即滚动左侧栏到目标项位置（使用 headingId 直接查找）
    const targetTocElement = tocContainerRef.current?.querySelector(`a[href="#${headingId}"]`);
    if (targetTocElement && tocContainerRef.current) {
      const containerHeight = tocContainerRef.current.offsetHeight;
      const elementTop = targetTocElement.offsetTop;
      const elementHeight = targetTocElement.offsetHeight;
      const scrollTo = elementTop - containerHeight / 2 + elementHeight / 2;
      // 使用 immediate 滚动，避免与后续的 smooth 滚动冲突
      tocContainerRef.current.scrollTo({ top: scrollTo, behavior: 'auto' });
    }

    // 如果使用外部状态管理，则调用外部处理函数
    if (externalOnLinkClick) {
      externalOnLinkClick(e, headingId);
    } else {
      // 否则使用内部状态管理
      setInternalActiveId(headingId);
      // 然后滚动右侧页面到目标位置
      const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    // 无论是否使用外部状态管理，都需要确保左侧栏滚动到正确位置
    // 因为外部处理函数可能不会处理左侧栏滚动

    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsClickScrolling(false);
      isHandlingClick.current = false;

      // 确保在滚动完成后，左侧栏滚动到激活项位置
      const activeElement = tocContainerRef.current?.querySelector(`.${styles.active}`);
      if (activeElement && tocContainerRef.current) {
        const containerHeight = tocContainerRef.current.offsetHeight;
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;
        const scrollTo = elementTop - containerHeight / 2 + elementHeight / 2;
        tocContainerRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' });
      }
    }, 800);
  };

  // === 阻止左侧栏滚动时页面滚动 ===
  const handleWheel = (e) => {
    // 阻止滚动事件冒泡到页面
    e.stopPropagation();
  };

  // === 阻止左侧栏滚动时页面滚动（触摸设备） ===
  const handleTouchMove = (e) => {
    // 阻止触摸滚动事件冒泡到页面
    e.stopPropagation();
  };

  // === 渲染部分 ===
  return (
    <nav
      ref={tocContainerRef}
      className={styles.tocContainer}
      style={positionStyle}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
    >
      <p className={styles.tocTitle}>On this page</p>
      <ul className={styles.tocList}>
        {headings.map((heading) => (
          <li key={heading.id} className={styles.tocItem}>
            <a
              href={`#${heading.id}`}
              className={`${styles.tocLink} ${activeId === heading.id ? styles.active : ''}`}
              onClick={(e) => handleLinkClick(e, heading.id)}
            >
              {heading.text}
            </a>

            {/* 如果有 subsections，则渲染二级导航 */}
            {Array.isArray(heading.subsections) && heading.subsections.length > 0 && (
              <ul className={styles.subTocList}>
                {heading.subsections.map((sub) => (
                  <li key={sub.id} className={styles.subTocItem}>
                    <a
                      href={`#${sub.id}`}
                      className={`${styles.subTocLink} ${activeId === sub.id ? styles.active : ''}`}
                      onClick={(e) => handleLinkClick(e, sub.id)}
                    >
                      {sub.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
