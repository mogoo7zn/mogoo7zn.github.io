import { useEffect, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';

/**
 * 页面加载完成检测Hook
 * 检测页面内容是否已经渲染完成
 */
export const usePageLoadDetection = () => {
  const { finishLoading } = useLoading();
  const hasTriggered = useRef(false);

  useEffect(() => {
    // 如果已经触发过，不再重复触发
    if (hasTriggered.current) return;

    const checkPageLoad = () => {
      // 检查关键元素是否已经渲染
      const mainContent = document.querySelector('main');
      const hasContent = mainContent && mainContent.children.length > 0;

      // 检查图片是否加载完成
      const images = document.querySelectorAll('img');
      const allImagesLoaded = Array.from(images).every((img) => img.complete);

      // 检查是否有异步内容
      const asyncElements = document.querySelectorAll('[data-async]');
      const asyncElementsReady =
        asyncElements.length === 0 ||
        Array.from(asyncElements).every((el) => el.dataset.loaded === 'true');

      if (hasContent && allImagesLoaded && asyncElementsReady) {
        console.log('📄 页面内容检测完成');
        finishLoading();
        hasTriggered.current = true;
      }
    };

    // 立即检查一次
    checkPageLoad();

    // 如果立即检查没有通过，设置定时器继续检查
    const timer = setTimeout(() => {
      checkPageLoad();
    }, 100);

    // 监听图片加载事件
    const handleImageLoad = () => {
      checkPageLoad();
    };

    // 监听DOM变化
    const observer = new MutationObserver(() => {
      checkPageLoad();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 添加图片加载监听
    document.addEventListener('load', handleImageLoad, true);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('load', handleImageLoad, true);
    };
  }, [finishLoading]);

  // 重置检测状态（用于页面切换）
  const resetDetection = () => {
    hasTriggered.current = false;
  };

  return { resetDetection };
};
