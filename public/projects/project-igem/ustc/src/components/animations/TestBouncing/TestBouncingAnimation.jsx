'use client';
import React from 'react';
import Lottie from 'lottie-react';
import TestBouncing from './TestBouncing.json'; // 1. 导入你的 JSON 文件

/**
 * 显示小恶魔 Lottie 动画的组件
 */
const TestBouncingAnimation = () => {
  const style = {
    height: 150, // 你可以根据需要调整动画的尺寸
    width: 150,
  };

  return (
    <Lottie 
      animationData={TestBouncing} // 2. 将动画数据传递给 Lottie 组件
      style={style}
      loop={true}           // 3. 设置为 true 表示循环播放
      autoplay={true}       // 4. 设置为 true 表示自动播放
    />
  );
};

export default TestBouncingAnimation;