'use client';
import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';

// --- 步骤 1: 在组件文件顶部，预先导入所有可能会用到的动画 JSON 文件 ---
import WetLabIntro from './WetLabIntro.json';
import WetLabLoop from './WetLabLoop.json';
import DryLabIntro from './DryLabIntro.json';
import DryLabLoop from './DryLabLoop.json';
import WikiIntro from './WikiIntro.json';
import WikiLoop from './WikiLoop.json';
import iHPIntro from './iHPIntro.json';
import iHPLoop from './iHPLoop.json';
import TeamLeadIntro from './TeamLeadIntro.json';
import TeamLeadLoop from './TeamLeadLoop.json';
import AdvisorsIntro from './AdvisorsIntro.json';
import AdvisorsLoop from './AdvisorsLoop.json';
import PIIntro from './PrincipalInvestigatorIntro.json';
import PILoop from './PrincipalInvestigatorLoop.json';
// ... 如果有更多，继续在这里导入

// --- 步骤 2: 创建一个映射表，方便查找 ---
const animationMap = {
  'wet-lab': { intro: WetLabIntro, loop: WetLabLoop },
  'dry-lab': { intro: DryLabIntro, loop: DryLabLoop },
  wiki: { intro: WikiIntro, loop: WikiLoop },
  ihp: { intro: iHPIntro, loop: iHPLoop },
  'team-lead': { intro: TeamLeadIntro, loop: TeamLeadLoop },
  advisors: { intro: AdvisorsIntro, loop: AdvisorsLoop },
  'principal-investigator': { intro: PIIntro, loop: PILoop },
};

/**
 * 一个自洽的、能根据 section 数据播放两阶段动画的组件
 * @param {object} section - 从 JSON 读取的 section 数据对象
 */
const TeamMemberTitle = ({ section, isInView }) => {
  const animationSet = animationMap[section.id];
  if (!animationSet) {
    return <h2>{section.text || 'Section Title'}</h2>;
  }

  const { intro: introData, loop: loopData } = animationSet;
  const [showLoop, setShowLoop] = useState(false);
  const lottieRef = useRef(null); // 我们需要 ref 来直接控制动画

  // --- 核心修改：使用 useEffect 来命令动画播放 ---
  useEffect(() => {
    const lottieInstance = lottieRef.current;
    if (!lottieInstance) return;

    // 当元素进入视口，并且我们还没有显示循环动画时
    if (isInView && !showLoop) {
      //   console.log('%c命令：播放出场动画！', 'color: blue; font-weight: bold;');
      // 直接命令 Lottie 播放出场片段
      lottieInstance.playSegments([0, 0], true); // 第二个参数 true 表示立即播放
    }
  }, [isInView, showLoop]); // 依赖于 isInView 和 showLoop 状态

  const handleIntroComplete = () => {
    setShowLoop(true);
  };

  return showLoop ? (
    <Lottie
      animationData={loopData}
      style={{ width: '100%', height: '100%' }}
      autoplay={true} // 循环动画可以直接自动播放
      loop={true}
    />
  ) : (
    <Lottie
      lottieRef={lottieRef} // 绑定 ref
      animationData={introData}
      style={{ width: '100%', height: '100%' }}
      autoplay={false} // 关键：初始时永远不自动播放
      loop={false}
      onComplete={handleIntroComplete}
    />
  );
};

export default TeamMemberTitle;
