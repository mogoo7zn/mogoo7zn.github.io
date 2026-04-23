import { useEffect, useState } from 'react';
import { useAnimation } from '../context/AnimationContext';

/**
 * 页面动画控制 Hook
 * 用于控制页面动画的播放时机，确保在加载完成后才开始播放
 *
 * @param {Object} options - 配置选项
 * @param {number} options.delay - 额外延迟时间（毫秒）
 * @param {boolean} options.enabled - 是否启用动画控制
 * @returns {Object} 动画控制状态
 */
export const usePageAnimation = (options = {}) => {
  const { delay = 0, enabled = true } = options;
  const { canStartAnimations, animationDelay, isLoading } = useAnimation();
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setShouldPlay(true);
      return;
    }

    // 如果动画可以开始播放，或者不在加载状态，就允许播放
    if (canStartAnimations || !isLoading) {
      // 计算总延迟时间
      const totalDelay = animationDelay + delay;

      if (totalDelay > 0) {
        const timer = setTimeout(() => {
          setShouldPlay(true);
        }, totalDelay);

        return () => clearTimeout(timer);
      } else {
        setShouldPlay(true);
      }
    } else {
      setShouldPlay(false);
    }
  }, [canStartAnimations, animationDelay, isLoading, delay, enabled]);

  return {
    shouldPlay,
    isLoading,
    canStartAnimations,
  };
};
