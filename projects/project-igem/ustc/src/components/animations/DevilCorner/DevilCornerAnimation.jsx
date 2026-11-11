'use client';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import DevilCorner from './DevilCorner.json';
import DevilCornerBig from './DevilCornerBig.json';
import DevilCornerSmall from './DevilCornerSmall.json';
import { usePageAnimation } from '../../../hooks/usePageAnimation';

/**
 * 显示小恶魔 Lottie 动画的组件
 * @param {string} width - 动画的宽度，可以接收任何 CSS 尺寸单位
 * @param {string} height - 动画的高度，可以接收任何 CSS 尺寸单位
 */
const DevilCornerAnimation = () => {
  const { shouldPlay } = usePageAnimation({ delay: 150, enabled: false }); // 暂时禁用动画控制
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // 监听动画播放权限
  useEffect(() => {
    if (shouldPlay) {
      setIsAnimationReady(true);
    }
  }, [shouldPlay]);

  const style = {
    width: '100%',
    height: '100%',
  };

  // 如果动画还没准备好，显示占位符
  if (!isAnimationReady) {
    return <div style={style} />;
  }

  return <Lottie animationData={DevilCornerBig} style={style} loop={true} autoplay={true} />;
};

export default DevilCornerAnimation;
