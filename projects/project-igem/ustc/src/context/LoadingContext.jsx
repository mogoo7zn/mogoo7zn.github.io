import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LOADER_CONFIG } from '../config/loader';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children, waitForResources = false }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageReady, setIsPageReady] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 启用初始加载检测
  const loadingTimeoutRef = useRef(null);
  const pageLoadStartTime = useRef(null);

  // 开始加载
  const startLoading = () => {
    console.log('🚀 开始页面加载');
    setIsLoading(true);
    setIsPageReady(false);
    pageLoadStartTime.current = Date.now();

    // 设置最小加载时间，避免加载器闪烁
    loadingTimeoutRef.current = setTimeout(() => {
      // 如果还在等待资源，不要自动设置为就绪
      if (!waitForResources) {
        setIsPageReady(true);
      }
    }, LOADER_CONFIG.MIN_LOADING_TIME);
  };

  // 完成加载
  const finishLoading = () => {
    console.log('✅ 页面加载完成');
    setIsPageReady(true);

    // 清除超时定时器
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  // 隐藏加载器
  const hideLoader = () => {
    console.log('👋 隐藏加载器');
    setIsLoading(false);
    setIsPageReady(false);
    setIsInitialLoad(false); // 标记初始加载完成
  };

  // 监听路由变化
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      // Only show loader for home page
      if (url !== '/' && !url.startsWith('/?')) return;

      console.log('📍 路由开始变化:', url);
      startLoading();
    };

    const handleRouteChangeComplete = (url) => {
      console.log('📍 路由变化完成:', url);
      finishLoading();
    };

    const handleRouteChangeError = (err, url) => {
      console.log('❌ 路由变化错误:', err, url);
      finishLoading();
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);

      // 清理定时器
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [router]);

  // 初始页面加载检测
  useEffect(() => {
    if (isInitialLoad) {
      // Only show loader for home page
      if (router.pathname !== '/') {
        setIsInitialLoad(false);
        return;
      }

      console.log('🎬 检测初始页面加载');

      // 如果没有开始加载，则开始加载
      if (!isLoading) {
        setIsLoading(true);
        setIsPageReady(false);
        pageLoadStartTime.current = Date.now();
      }

      // 如果还在等待外部资源，暂停检测
      if (waitForResources) {
        console.log('⏳ 等待资源加载...');
        return;
      }

      // 检测页面是否已经加载完成
      const checkInitialLoad = () => {
        // 检查是否有任何内容渲染
        const hasContent = document.body && document.body.children.length > 0;
        const images = document.querySelectorAll('img');
        const allImagesLoaded =
          images.length === 0 || Array.from(images).every((img) => img.complete);

        // 检查是否有React组件已经渲染
        const reactRoot = document.getElementById('__next');
        const hasReactContent = reactRoot && reactRoot.children.length > 0;

        if ((hasContent || hasReactContent) && allImagesLoaded) {
          console.log('📄 初始页面内容检测完成');

          // 确保最小加载时间
          const elapsed = Date.now() - (pageLoadStartTime.current || Date.now());
          const remaining = Math.max(0, LOADER_CONFIG.MIN_LOADING_TIME - elapsed);

          if (remaining > 0) {
            setTimeout(finishLoading, remaining);
          } else {
            finishLoading();
          }
        } else {
          // 如果还没准备好，继续检测
          setTimeout(checkInitialLoad, 100);
        }
      };

      // 延迟一点开始检测，确保DOM已经渲染
      setTimeout(checkInitialLoad, 200);

      // 设置一个最大超时时间，防止无限等待
      const maxTimeout = setTimeout(() => {
        console.log('⏰ 初始加载超时，强制完成');
        finishLoading();
      }, LOADER_CONFIG.MAX_INITIAL_LOAD_TIME);

      return () => clearTimeout(maxTimeout);
    }
  }, [isInitialLoad, waitForResources]);

  const value = {
    isLoading,
    isPageReady,
    isInitialLoad,
    startLoading,
    finishLoading,
    hideLoader,
  };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};
