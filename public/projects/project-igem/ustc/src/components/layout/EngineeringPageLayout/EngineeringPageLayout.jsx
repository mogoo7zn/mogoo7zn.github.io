import React, { useState, useEffect, useRef } from 'react';
import { BaseBanner, TableOfContents } from '../../common'; // 从 common 导入
import { GridLayer } from '../../background'; 
import { CrosshairsLayer } from '../../background'; 
import { useScrollspy } from '../../../hooks/useScrollspy';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import { useCustomInView } from '../../../hooks/useCustomInView';
import { HeaderAnimation } from '../../animations';
import { DevilCornerAnimation } from '../../animations'; // <-- 路径请根据你的项目结构调整
import { DownArrowAnimation } from '../../animations';
import styles from './EngineeringPageLayout.module.scss'; // 导入与自己同名的样式文件

// 将 ContentSection 作为内部辅助组件，因为它只被这个布局使用
const ContentSection = ({ section }) => {
  switch (section.type) {
    case 'heading':
      return (
        <h2 id={section.id} className={styles.subheading}>
          {section.text}
        </h2>
      );
    case 'paragraph':
      return <p className={styles.paragraph}>{section.text}</p>;
    case 'image':
      return (
        <div className={styles.imageContainer}>
          <img src={section.src} alt={section.alt} layout="responsive" />
        </div>
      );
    default:
      return null;
  }
};

// 这是我们的核心模板组件，它接收 pageData 作为 prop
const EngineeringPageLayout = ({ pageData }) => {
  if (!pageData) {
    // 可以返回一个 Loading 组件或 null
    return <div>Error: No page data provided.</div>;
  }

  const headings = pageData.sections.filter((s) => s.type === 'heading');
  const headingIds = headings.map((h) => h.id);

  // 所有 Hooks 和交互逻辑都封装在这里
  const [activeId, setActiveId] = useState(headings[0]?.id || '');
  const [isClickScrolling, setIsClickScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const headerHeight = useHeaderHeight();
  const [scrollspyOptions, setScrollspyOptions] = useState(null);

  // State: 统一管理箭头是否应该消失的状态
  const [isArrowFadingOut, setArrowFadingOut] = useState(false);

  // Hook: 监视箭头元素是否在视口内
  const [arrowRef, isArrowVisible] = useCustomInView({
    threshold: 0.5,
  });

  // --- 新增：处理箭头点击事件的函数 ---
  const handleArrowClick = () => {
    const targetElement = document.getElementById('main-content');
    if (!targetElement) return;
    console.log('handleArrowClick 被触发');
    
    // 1. 计算出最终要滚动到的精确位置 (和之前一样)
    const elementPosition = targetElement.getBoundingClientRect().top;
    const currentScrollY = window.scrollY;
    const targetScrollPosition = elementPosition + currentScrollY - headerHeight - 32;

    // 2. 直接调用工具函数
    // smoothScrollTo(targetScrollPosition, 1000);
    setTimeout(() => {
      window.scrollTo({
        top: targetScrollPosition,

        behavior: 'smooth',
      });
    }, 500);

    setArrowFadingOut(true);
  };

  // 使用 useEffect 来根据可见性更新状态
  useEffect(() => {
    // 当 isArrowVisible 从 true 变为 false 时...
    // console.log('箭头可见性变化:', isArrowVisible);
    if (!isArrowVisible) {
      // ...更新 state 来触发消失动画

      setArrowFadingOut(false);
      // console.log('isArrowFadingOut 状态更新为 ', isArrowFadingOut);
    }
  }, [isArrowVisible]); // 这个 effect 只在 isArrowVisible 变化时运行

  
  
  
  
  
  useEffect(() => {
    const topOffset = headerHeight + 32;
    setScrollspyOptions({
      rootMargin: `-${topOffset}px 0px -${window.innerHeight - topOffset - 50}px 0px`,
    });
  }, [headerHeight]);

  const observedId = useScrollspy(headingIds, scrollspyOptions);

  useEffect(() => {
    if (observedId && !isClickScrolling) {
      setActiveId(observedId);
    }
  }, [observedId, isClickScrolling]);

  const handleLinkClick = (e, headingId) => {
    e.preventDefault();
    setIsClickScrolling(true);
    setActiveId(headingId);
    const targetElement = document.getElementById(headingId);
    if (!targetElement) {
      setIsClickScrolling(false);
      return;
    }
    const topOffset = headerHeight + 32;
    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsClickScrolling(false);
    }, 800);
  };

  return (
     <div className={styles.layoutWrapper}>
      {/* 3. 在布局的最顶层渲染背景组件 */}
      <GridLayer/>
      {/* <CrosshairsLayer/> */}
      <BaseBanner id={`${pageData.title}-banner`} className={styles.descriptionBanner}>
        <div className={styles.bannerContent}>
          {/* 动画 */}
          <div className={styles.titleAnimationContainer}>
            <HeaderAnimation title={pageData.title} />
          </div>

          {/* 描述文字 */}
          <p className={styles.bannerDescription}>
            {pageData.description || `An overview of the ${pageData.title} section.`}
          </p>
        </div>
        <div className={styles.bannerAnimationsContainer}>
          <div className={styles.cornerAnimation}>
            <DevilCornerAnimation />
          </div>
          <div className={styles.arrowAnimation} onClick={handleArrowClick} ref={arrowRef}>
            <DownArrowAnimation isOutOfView={isArrowFadingOut} />
          </div>
        </div>
      </BaseBanner>

      <div className={styles.container} id='main-content'>
        <aside className={styles.leftColumn}>
          <TableOfContents headings={headings} activeId={activeId} onLinkClick={handleLinkClick} />
        </aside>
        <article className={styles.rightColumn}>
          {pageData.sections.map((section, index) => (
            <ContentSection key={index} section={section} />
          ))}
        </article>
      </div>
    </div>
  );
};

export default EngineeringPageLayout;
