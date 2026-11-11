'use client';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { usePageAnimation } from '../../../hooks/usePageAnimation';

// 1. 在同一个文件中导入两个不同的 JSON 动画文件
import MembersIntro from './MembersHeaderIntro.json';
import MembersLoop from './MembersHeaderLoop.json';
import EngineeringIntro from './EngineeringHeaderIntro.json';
import EngineeringLoop from './EngineeringHeaderLoop.json';
import NotebookIntro from './NotebookHeaderIntro.json';
import NotebookLoop from './NotebookHeaderLoop.json';
import ProtocolIntro from './ProtocolHeaderIntro.json';
import ProtocolLoop from './ProtocolHeaderLoop.json';
import ResultsIntro from './ResultsHeaderIntro.json';
import ResultsLoop from './ResultsHeaderLoop.json';
import PartsIntro from './PartsHeaderIntro.json';
import PartsLoop from './PartsHeaderLoop.json';
import ProofofConceptIntro from './ProofofConceptHeaderIntro.json';
import ProofofConceptLoop from './ProofofConceptHeaderLoop.json';
import AttributionsIntro from './AttributionsHeaderIntro.json';
import AttributionsLoop from './AttributionsHeaderLoop.json';
import HardwareIntro from './HardwareHeaderIntro.json';
import HardwareLoop from './HardwareHeaderLoop.json';
import EducationIntro from './EducationHeaderIntro.json';
import EducationLoop from './EducationHeaderLoop.json';
import ModelIntro from './ModelHeaderIntro.json';
import ModelLoop from './ModelHeaderLoop.json';
import ContributionIntro from './ContributionHeaderIntro.json';
import ContributionLoop from './ContributionHeaderLoop.json';
import DescriptionIntro from './DescriptionHeaderIntro.json';
import DescriptionLoop from './DescriptionHeaderLoop.json';
import DesignIntro from './DesignHeaderIntro.json';
import DesignLoop from './DesignHeaderLoop.json';
import ImplementationIntro from './ImplementationHeaderIntro.json';
import ImplementationLoop from './ImplementationHeaderLoop.json';
import SafetyIntro from './SafetyHeaderIntro.json';
import SafetyLoop from './SafetyHeaderLoop.json';
import RosterIntro from './RosterHeaderIntro.json';
import RosterLoop from './RosterHeaderLoop.json';
import CollaborationIntro from './CollaborationHeaderIntro.json';
import CollaborationLoop from './CollaborationHeaderLoop.json';
import iHPIntro from './iHPHeaderIntro.json';
import iHPLoop from './iHPHeaderLoop.json';

const animationTitleMap = {
  Members: { intro: MembersIntro, loop: MembersLoop },
  Engineering: { intro: EngineeringIntro, loop: EngineeringLoop },
  Notebook: { intro: NotebookIntro, loop: NotebookLoop },
  Protocol: { intro: ProtocolIntro, loop: ProtocolLoop },
  Results: { intro: ResultsIntro, loop: ResultsLoop },
  Parts: { intro: PartsIntro, loop: PartsLoop },
  'Proof of Concept': { intro: ProofofConceptIntro, loop: ProofofConceptLoop },
  Attributions: { intro: AttributionsIntro, loop: AttributionsLoop },
  Hardware: { intro: HardwareIntro, loop: HardwareLoop },
  Education: { intro: EducationIntro, loop: EducationLoop },
  Model: { intro: ModelIntro, loop: ModelLoop },
  Contribution: { intro: ContributionIntro, loop: ContributionLoop },
  Description: { intro: DescriptionIntro, loop: DescriptionLoop },
  Design: { intro: DesignIntro, loop: DesignLoop },
  Implementation: { intro: ImplementationIntro, loop: ImplementationLoop },
  Safety: { intro: SafetyIntro, loop: SafetyLoop },
  Roster: { intro: RosterIntro, loop: RosterLoop },
  Collaboration: { intro: CollaborationIntro, loop: CollaborationLoop },
  iHP: { intro: iHPIntro, loop: iHPLoop },
  'Human Practices': { intro: iHPIntro, loop: iHPLoop },
};

const MembersHeaderAni = ({ title }) => {
  const animationSet = animationTitleMap[title];
  const { shouldPlay } = usePageAnimation({ delay: 100, enabled: false }); // 暂时禁用动画控制

  if (!animationSet) {
    return <h2>{title || 'Section Title'}</h2>;
  }

  // 1. 解构出入场和循环动画数据
  const { intro: introAnimationData, loop: loopAnimationData } = animationSet;

  // 2. 创建一个 state 来决定显示哪个动画
  //    false = 显示出场动画, true = 显示循环动画
  const [showLoopAnimation, setShowLoopAnimation] = useState(false);

  // 3. 这个函数会在出场动画播放完毕后被调用
  const handleIntroComplete = () => {
    // console.log('出场动画播放完毕，切换到循环动画！');
    // 更新状态，触发重渲染以显示循环动画
    setShowLoopAnimation(true);
  };

  // 4. 使用条件渲染 (三元运算符)
  return showLoopAnimation ? (
    // 如果 showLoopAnimation 是 true，渲染循环动画
    <Lottie
      animationData={loopAnimationData}
      style={{ width: '100%', height: '100%' }}
      autoplay={true}
      loop={true}
    />
  ) : (
    // 否则，渲染出场动画
    <Lottie
      animationData={introAnimationData}
      style={{ width: '100%', height: '100%' }}
      autoplay={true}
      loop={false} // 只播放一次
      onComplete={handleIntroComplete} // 播放完毕后调用切换函数
    />
  );
};

export default MembersHeaderAni;
