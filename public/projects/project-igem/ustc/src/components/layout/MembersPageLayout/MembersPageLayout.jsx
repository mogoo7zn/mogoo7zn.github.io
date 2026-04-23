import React, { useState, useEffect, useRef } from 'react';
import { BaseBanner, TableOfContents } from '../../common'; // 从 common 导入
import { GridLayer } from '../../background';
import { CrosshairsLayer } from '../../background';
import { useScrollspy } from '../../../hooks/useScrollspy';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import { useCustomInView } from '../../../hooks/useCustomInView';
import { smoothScrollTo } from '../../../utils/scroll';
import { HeaderAnimation } from '../../animations';
import { TeamMemberTitle } from '../../animations';
import { DevilCornerAnimation } from '../../animations'; // <-- 路径请根据你的项目结构调整
import { DownArrowAnimation } from '../../animations';
import styles from './MembersPageLayout.module.scss'; // 导入与自己同名的样式文件

// 将 ContentSection 作为内部辅助组件，因为它只被这个布局使用
const ContentSection = ({ section, flippedState, onClick = () => {}, onMouseLeave = () => {} }) => {
  const [ref, inView] = useCustomInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  switch (section.type) {
    case 'separator-heading':
      return (
        <div id={section.id} className={styles.separatorHeading} ref={ref}>
          {/* 调用变得非常简单，只需传入 section 即可 */}
          <TeamMemberTitle section={section} isInView={inView} />
        </div>
      );

    case 'card':
      return (
        <div className={styles.cardSlot} onClick={onClick} onMouseLeave={onMouseLeave}>
          <div className={`${styles.card} ${flippedState ? styles.isFlipped : ''}`}>
            {/* 卡片正面 */}
            <div className={`${styles.cardFace} ${styles.cardFront}`}>
              <div className={styles.photoPlaceholder}>
                {section.front.photo && (
                  <img
                    src={section.front.photo}
                    alt={section.front.name}
                    className={styles.photo}
                  />
                )}
              </div>
              <div className={styles.info}>
                <p>Major</p>
                <p className={styles.infoText}>{section.front.major}</p>
                <p>Position</p>
                <p className={styles.infoText}>{section.front.position}</p>
              </div>
              <div className={styles.nameTag}>{section.front.name}</div>
            </div>
            {/* 卡片背面 */}
            <div className={`${styles.cardFace} ${styles.cardBack}`}>
              <h2>{section.back.title}</h2>
              <p>{section.back.text}</p>
            </div>
          </div>
        </div>
      );
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
const MembersPageLayout = ({ pageData }) => {
  if (!pageData) {
    // 可以返回一个 Loading 组件或 null
    return <div>Error: No page data provided.</div>;
  }

  const headings = pageData.sections.filter((s) => s.type === 'heading');
  const headingIds = headings.map((h) => h.id);

  // 所有 Hooks 和交互逻辑都封装在这里

  const [isClickScrolling, setIsClickScrolling] = useState(false);

  const headerHeight = useHeaderHeight();

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

  // 为所有卡片创建一个统一的翻转状态 state
  const [flippedStates, setFlippedStates] = useState({});

  const handleCardClick = (cardId) => {
    setFlippedStates((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleMouseLeave = (cardId) => {
    setFlippedStates((prev) => ({ ...prev, [cardId]: false }));
  };

  return (
    <div className={styles.layoutWrapper}>
      <GridLayer />
      {/* <CrosshairsLayer /> */}

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

      {/* --- ↓↓↓ 渲染逻辑重构 ↓↓↓ --- */}
      <section id="main-content">
        {pageData.sections.map((section, index) => {
          // 如果是分隔标题，则渲染标题，并紧接着渲染该标题下的所有成员卡片
          if (section.type === 'separator-heading') {
            return (
              <React.Fragment key={section.id || index}>
                <ContentSection section={section} />
                <div className={styles.cardContainer}>
                  {section.members &&
                    section.members.map((member) => (
                      <ContentSection
                        key={member.id}
                        section={member}
                        flippedState={flippedStates[member.id] || false}
                        onClick={() => handleCardClick(member.id)}
                        onMouseLeave={() => handleMouseLeave(member.id)}
                      />
                    ))}
                </div>
              </React.Fragment>
            );
          }

          // 对于其他类型的 section，直接渲染
          // 注意：这种结构下，普通 heading 和 paragraph 应该放在 JSON 的顶层 sections 数组中
          // 并且不属于任何一个 separator-heading
          return <ContentSection key={section.id || index} section={section} />;
        })}
      </section>
      {/* --- ↑↑↑ 渲染逻辑重构结束 ↑↑↑ --- */}
    </div>
  );
};

export default MembersPageLayout;
