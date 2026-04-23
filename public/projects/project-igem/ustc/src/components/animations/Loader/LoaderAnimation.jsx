'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'; // 假设使用 Pages Router
import Lottie from 'lottie-react';
import IntroData from './LoadingAnimationIntro.json'
import LoopData from './LoadingAnimationLoop.json';
import OutroData from './LoadingAnimationOutro.json';
import styles from './LoaderAnimation.module.scss';

const LoaderAnimation = () => {
  const router = useRouter();
  // State 追踪当前显示的动画数据，初始为 Intro
  const [currentData, setCurrentData] = useState(IntroData);
  // State 追踪是否开启循环
  const [isLooping, setIsLooping] = useState(false);
  // Ref 追踪加载是否完成的信号，用于优雅退出
  const isReadyToExit = useRef(false); 
  const [isVisible, setIsVisible] = useState(false); // 控制整个加载器的显示/隐藏

  // --- 事件处理函数 ---
  
  // 1A. 动画 Intro 播放完毕 (Intro -> Loop)
  const handleIntroEnd = () => {
    console.log('Phase 1/3: Intro 结束，切换到 Loop');
    setCurrentData(LoopData);
    setIsLooping(true); // 开启循环
  };

  // 1B. 动画 Loop 播放完一轮 (Loop -> Outro)
  const handleLoopCycleComplete = () => {
    // 检查是否收到了退出信号
    if (isReadyToExit.current) {
      console.log('Phase 2/3: 收到退出信号，切换到 Outro');
      setIsLooping(false); // 停止循环
      setCurrentData(OutroData);
    }
  };
  
  // 1C. 动画 Outro 播放完毕 (Outro -> IDLE)
  const handleOutroEnd = () => {
    console.log('Phase 3/3: Outro 结束，隐藏加载器');
    setIsVisible(false); // 隐藏加载器
    // 确保状态重置，为下一次导航做准备
    setCurrentData(IntroData); 
    isReadyToExit.current = false;
  };


  // --- 路由事件监听 (核心调度) ---
  useEffect(() => {
    // 路由开始变化：显示加载器，启动 Intro 动画
    const handleStart = () => {
      setIsVisible(true);
      setCurrentData(IntroData); // 确保从 Intro 开始
      setIsLooping(false);
      isReadyToExit.current = false;
    };

    // 路由加载完成：设置标记，准备退出循环
    const handleComplete = () => {
      console.log('!!! 页面内容加载完成，设置退出标记 !!!');
      isReadyToExit.current = true;
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete); // 路由失败也应该结束加载

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);


  if (!isVisible) {
    return null; // 加载器闲置时，不渲染任何内容
  }

  // --- 最终渲染：一个 Lottie 组件处理所有变化 ---
  return (
    <div className={styles.loaderOverlay}>
      <Lottie
        animationData={currentData}
        // 根据 currentData 决定绑定哪个事件处理器
        onComplete={currentData === IntroData ? handleIntroEnd : (currentData === OutroData ? handleOutroEnd : undefined)}
        onLoopComplete={currentData === LoopData ? handleLoopCycleComplete : undefined}
        
        loop={isLooping}
        autoplay={true}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default LoaderAnimation;