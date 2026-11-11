'use client';
import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import IntroData from './LoadingAnimationIntro.json';
import LoopData from './LoadingAnimationLoop.json';
import OutroData from './LoadingAnimationOutro.json';
import { useLoading } from '../../../context/LoadingContext';
import styles from './LoaderAnimation.module.scss';

const GlobalLoader = ({ fullscreen = false }) => {
  const { isLoading, isPageReady, hideLoader } = useLoading();

  // 动画状态管理
  const [currentData, setCurrentData] = useState(IntroData);
  const [isLooping, setIsLooping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, intro, loop, outro

  // 动画阶段处理函数
  const handleIntroEnd = () => {
    console.log('🎬 Intro 动画结束，切换到 Loop');
    setCurrentData(LoopData);
    setIsLooping(true);
    setAnimationPhase('loop');
  };

  const handleLoopCycleComplete = () => {
    // 检查页面是否准备就绪
    if (isPageReady) {
      console.log('🔄 Loop 完成，页面已准备就绪，切换到 Outro');
      setIsLooping(false);
      setCurrentData(OutroData);
      setAnimationPhase('outro');
    }
  };

  const handleOutroEnd = () => {
    console.log('🎭 Outro 动画结束，隐藏加载器');
    setIsVisible(false);
    setAnimationPhase('idle');
    hideLoader();

    // 重置状态为下次使用做准备
    setTimeout(() => {
      setCurrentData(IntroData);
      setIsLooping(false);
    }, 100);
  };

  // 监听加载状态变化
  useEffect(() => {
    if (isLoading && !isVisible) {
      console.log('🎬 开始显示加载器');
      setIsVisible(true);
      setCurrentData(IntroData);
      setIsLooping(false);
      setAnimationPhase('intro');
    }
  }, [isLoading, isVisible]);

  // 如果不可见，不渲染任何内容
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContent}>
        <div className={styles.lottieContainer}>
          <Lottie
            animationData={currentData}
            onComplete={
              animationPhase === 'intro'
                ? handleIntroEnd
                : animationPhase === 'outro'
                  ? handleOutroEnd
                  : undefined
            }
            onLoopComplete={animationPhase === 'loop' ? handleLoopCycleComplete : undefined}
            loop={isLooping}
            autoplay={true}
            className={`${styles.lottieAnimation} ${fullscreen ? styles.fullscreen : ''}`}
          />
        </div>
        <div className={styles.loadingText}>
          {animationPhase === 'intro' && 'Loading...'}
          {animationPhase === 'loop' && 'Loading...'}
          {animationPhase === 'outro' && 'Almost ready...'}
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
