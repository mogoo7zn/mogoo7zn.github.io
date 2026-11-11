'use client';
import React, { useState, useEffect, useRef } from 'react'; // 1. 导入 useEffect 和 useRef
import Lottie from 'lottie-react';
import { usePageAnimation } from '../../../hooks/usePageAnimation';

import downArrowData from './DownArrow.json';
import fadeOutData from './ArrowFadeOut.json';

const DownArrowAnimation = ({ isOutOfView }) => {
  const { shouldPlay } = usePageAnimation({ delay: 200, enabled: false }); // 暂时禁用动画控制
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // 2. state 保持不变，仍然作为我们逻辑的"开关"
  const [showAnother, setShowAnother] = useState(false);
  // 3. 创建一个 ref 来直接访问 Lottie 实例
  const lottieRef = useRef(null);

  // 监听动画播放权限
  useEffect(() => {
    if (shouldPlay) {
      setIsAnimationReady(true);
    }
  }, [shouldPlay]);

  const handleToggleAnimation = () => {
    setShowAnother((prevState) => !prevState);
  };

  useEffect(() => {
    const lottieInstance = lottieRef.current;
    if (!lottieInstance) return; // 确保 Lottie 实例存在

    if (isOutOfView) {
      // 如果 state 是 true，加载并播放 fadeOut 动画
      // console.log('命令：播放 FadeOut 动画');
      // console.log('isOutOfView状态:', isOutOfView);
      // lottieInstance.loadAnimation({
      //   animationData: fadeOutData,
      //   autoplay: true,
      //   loop: false, // 不循环
      // });
      lottieInstance.playSegments([0, 0], true); // 播放 fadeOut 动画的第一帧
    }
    // } else {
    //   // 如果 state 是 false，加载并播放 downArrow 动画
    //   console.log('命令：播放 DownArrow 动画');
    //   lottieInstance.loadAnimation({
    //     animationData: downArrowData,
    //     autoplay: true,
    //     loop: true, // 循环
    //   });
    // }
  }, [isOutOfView]); // 关键：每当 isOutOfView 变化时，就执行上面的逻辑

  const style = {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  };

  // 如果动画还没准备好，显示占位符
  if (!isAnimationReady) {
    return <div style={style} />;
  }

  return isOutOfView ? (
    // <div onClick={handleToggleAnimation}>
    <Lottie
      lottieRef={lottieRef}
      animationData={fadeOutData}
      style={style}
      autoplay={false}
      loop={false}
    />
  ) : (
    // </div>
    // <div onClick={handleToggleAnimation}>
    <Lottie
      lottieRef={lottieRef}
      // 5. 初始时加载默认动画，useEffect 会在 state 变化时覆盖它
      animationData={downArrowData}
      style={style}
      autoplay={true}
      loop={true}
    />
    // </div>
  );
};

export default DownArrowAnimation;
