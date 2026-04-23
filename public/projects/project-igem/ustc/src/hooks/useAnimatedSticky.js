import { useState, useLayoutEffect } from 'react';

/**
 * 最终版：实现滑入、居中，并在最后一个子元素即将被Footer遮挡时才开始向上移动的智能效果。
 * @param {React.RefObject<HTMLElement>} stickyElementRef - 要应用效果的元素的 ref (目录<nav>容器)
 * @returns {object} 一个包含动态样式的 style 对象
 */
export function useAnimatedSticky(stickyElementRef) {
  const [style, setStyle] = useState({
    position: 'fixed',
    top: '0px', // 我们将 top 固定为 0，完全用 transform 控制垂直位置
    transform: 'translateY(100vh)', // 初始位置在视窗底部之外
    transition: 'transform 0.4s ease-out', // 只对 transform 进行过渡
  });

  useLayoutEffect(() => {
    // 确保 ref 存在，否则不执行
    if (!stickyElementRef.current) return;

    const handleScroll = () => {
      if (!stickyElementRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const stickyElementHeight = stickyElementRef.current.offsetHeight;

      const footer = document.querySelector('footer');
      const footerRect = footer ? footer.getBoundingClientRect() : { top: Infinity };

      // --- 统一计算最终的 translateY 值 ---

      // 目标1：让目录在视窗中垂直居中时，它应该在的 translateY 值
      const centeredY = viewportHeight / 2 - stickyElementHeight / 2;

      // 目标2：计算为了让“最后一项”停靠在 Footer 上方，整个容器需要的 translateY 值
      let dockedY = centeredY; // 默认情况下，停靠位置就是居中位置

      // ✅ 关键修改：找到最后一个 li 元素
      const lastItem = stickyElementRef.current.querySelector('ul > li:last-child');

      if (lastItem) {
        const lastItemHeight = lastItem.offsetHeight;
        const lastItemOffsetTop = lastItem.offsetTop; // lastItem 相对于其父级 ul 的顶部距离

        // 我们希望 lastItem 的底部正好在 footer 的顶部（再加一点间距）
        // 整个容器需要向上移动的距离 (translateY) =
        // footer的顶部位置 - 间距 - lastItem的底部绝对位置(相对于容器顶部)
        dockedY = footerRect.top - 32 - (lastItemOffsetTop + lastItemHeight);
      }

      // 核心逻辑：在“居中”和“底部停靠”两个目标位置中，选择一个更靠上的（即值更小的那一个）
      let targetY = Math.min(centeredY, dockedY);

      // 目标3：最后处理初始的滑入动画
      if (scrollY < viewportHeight) {
        const slideInY = viewportHeight - scrollY;
        // 在滑入过程中，确保目录不会被向上拉得超过滑入动画应在的位置
        targetY = Math.max(targetY, slideInY);
      }

      setStyle((prev) => ({
        ...prev,
        transform: `translateY(${targetY}px)`,
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    // 延迟一小段时间再进行初始调用，确保所有尺寸都已计算完毕
    const initialTimeout = setTimeout(handleScroll, 100);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [stickyElementRef]);

  return style;
}
