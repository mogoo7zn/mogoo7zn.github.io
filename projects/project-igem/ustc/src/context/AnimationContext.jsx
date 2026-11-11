import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';
import { LOADER_CONFIG } from '../config/loader';

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const { isLoading, isPageReady } = useLoading();
  const [canStartAnimations, setCanStartAnimations] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  // 监听加载状态，控制页面动画
  useEffect(() => {
    // Strict check: animations only start after loader is completely hidden (!isLoading)
    if (!isLoading) {
      console.log('🎭 Loader fully hidden, page animations allowed');
      
      // Optional delay before starting animations
      const delayTimer = setTimeout(() => {
        setCanStartAnimations(true);
        setAnimationDelay(0);
      }, LOADER_CONFIG.PAGE_ANIMATION_DELAY || 0);

      return () => clearTimeout(delayTimer);
    } else {
      // While loading (intro, loop, outro), prevent animations
      // console.log('⏸️ Loader active, pausing page animations');
      setCanStartAnimations(false);
      setAnimationDelay(LOADER_CONFIG.PAGE_ANIMATION_DELAY || 100);
    }
  }, [isLoading]);

  const value = {
    canStartAnimations,
    animationDelay,
    isLoading,
    isPageReady,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};
