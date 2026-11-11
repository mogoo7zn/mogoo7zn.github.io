import React, { useEffect, useRef, useState, forwardRef, useLayoutEffect } from 'react';
import styles from './Two.module.scss';
import Grid from '../../common/Background/Grid';
import { useInteraction } from '../../../context/InteractionContext';

const toxinData = [
  {
    type: 'oral',
    title: 'Oral',
    description: '1μg/kg.',
    icon: '💊',
    position: 'left',
  },
  {
    type: 'inhalation',
    title: 'Inhale',
    description: '10ng/kg.',
    icon: '🫁',
    position: 'right',
  },
  {
    type: 'injection',
    title: 'Inject',
    description: '1ng/kg.',
    icon: '💉',
    position: 'left',
  },
];

const bigTextContent = [
  'SO, HOW TO DETECT',
  'BoNT/A?',
  'IT IS A QUESTION...',
  'Maybe...USING THE MOUSE?',
];

// 可控制的计时依次显示
function useControlledTimedReveal(count, delayMs = 500) {
  const [visibleIdx, setVisibleIdx] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timeouts = [];
    for (let i = 1; i < count; i += 1) {
      timeouts.push(
        setTimeout(() => {
          setVisibleIdx(i);
        }, i * delayMs) // 修复：每条对话框间隔delayMs时间
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [count, delayMs, isActive]);

  const startReveal = () => {
    setVisibleIdx(0); // 立即显示第一条
    setIsActive(true);
  };
  const resetReveal = () => {
    setIsActive(false);
    setVisibleIdx(-1);
  };

  return { visibleIdx, startReveal, resetReveal, isActive };
}

const BubbleSection = ({ item, index, sectionRef, visible }) => {
  const [done, setDone] = useState(false);
  // 更合理的垂直位置分布：上方(20vh)、中间(40vh)、下方(60vh)
  const positions = ['20vh', '40vh', '60vh'];

  // 处理描述文本，将特定数值标红
  const formatDescription = (text) => {
    // 匹配需要标红的数值：10ng/kg、1μg/kg、1 ng/kg
    const pattern = /(10ng\/kg|1μg\/kg|1ng\/kg)/g;
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      if (pattern.test(part)) {
        return (
          <span key={index} className={styles.redText}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section ref={sectionRef} className={styles.bubbleSection}>
      <div
        className={`${styles.textBox} ${styles[item.position]} ${visible ? styles.animateIn : ''} ${done ? styles.done : ''}`}
        data-index={index}
        onTransitionEnd={() => !done && setDone(true)}
      >
        <div className={styles.textBoxContent}>
          <div className={styles.titleBlock}>
            <span className={styles.titleText}>{item.title.toUpperCase()}</span>
          </div>
          <div className={styles.descriptionBlock}>
            <p className={styles.desc}>{formatDescription(item.description)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const BigTextSection = ({ visible }) => {
  const show = visible;

  return (
    <section id="big-text" className={styles.bigTextSection}>
      {/* Grid Background for BigTextSection */}
      <Grid />
      <div className={styles.bigTextContainer}>
        {bigTextContent.map((line, i) => (
          <div
            key={i}
            className={`${styles.bigTextLine} ${show ? styles.animateIn : ''}`}
            style={{ transitionDelay: `${[0.2, 1.0, 1.8, 4.0][i]}s` }}
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  );
};

// 防抖函数
const debounce = (fn, ms) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
};

const Two = forwardRef((props, ref) => {
  const { isTwoLocked, setIsTwoLocked, targetBottom, setTargetBottom } = useInteraction(); // Corrected: Remove duplicates
  const { visibleIdx, startReveal, resetReveal, isActive } = useControlledTimedReveal(
    toxinData.length,
    720
  );
  const refs = useRef([]);
  const containerRef = useRef(null);
  const continueBtnRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const allShown = visibleIdx === toxinData.length - 1;

  // 监听滚动触发 reveal
  useEffect(() => {
    if (!ref.current || hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 当组件70%进入视窗时触发动画和滚动锁定
        if (entry.isIntersecting) {
          setHasTriggered(true);
          startReveal();
        }
      },
      {
        threshold: 0, // 70%可见时触发
        rootMargin: '80px 0px 0px 0px',
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hasTriggered, startReveal]);

  // 当第三个气泡出现时，显示继续按钮并锁定滚动
  useEffect(() => {
    if (visibleIdx === toxinData.length - 1 && !showBtn) {
      const t = setTimeout(() => {
        setShowBtn(true);
        setAnimationComplete(true);
        setIsTwoLocked(true);
      }, 720);
      return () => clearTimeout(t);
    }
  }, [visibleIdx, showBtn, setIsTwoLocked]);

  // 使用useLayoutEffect进行立即、同步计算
  useLayoutEffect(() => {
    if (showBtn && continueBtnRef.current && targetBottom === 0) {
      const updateTarget = debounce(() => {
        const rect = continueBtnRef.current.getBoundingClientRect();
        const currentScrollY = window.scrollY;
        const offset = 80; // 调整用于微调的偏移量
        const rectBottom = currentScrollY + rect.bottom + offset;
        setTargetBottom(rectBottom);
        console.log('debug: Calculated targetBottom', rectBottom);
      }, 30);

      updateTarget();

      window.addEventListener('scroll', updateTarget);
      window.addEventListener('resize', updateTarget);

      return () => {
        window.removeEventListener('scroll', updateTarget);
        window.removeEventListener('resize', updateTarget);
      };
    }
  }, [showBtn, setTargetBottom, targetBottom]);

  // 当显示标题或继续时，重置targetBottom
  useEffect(() => {
    if (showTitle) {
      setIsTwoLocked(false);
      setTargetBottom(0); // 重置
    }
  }, [showTitle, setIsTwoLocked, setTargetBottom]);

  // 点击按钮滚动到大标题显示
  const handleContinue = () => {
    if (showTitle) return;
    setIsTwoLocked(false);
    setTargetBottom(0); // 重置

    const bigTextSection = document.getElementById('big-text');
    if (bigTextSection) {
      const sectionRect = bigTextSection.getBoundingClientRect();
      const desiredTopMargin = window.innerHeight * 0.15;
      const targetScrollY = window.scrollY + sectionRect.top - desiredTopMargin;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      setTimeout(() => setShowTitle(true), 200);
    }
  };

  return (
    <section id="two" className={styles.mainContainer} ref={ref}>
      <Grid />
      <div className={styles.medianLethalDoseTitle}>Median lethal dose</div>
      {toxinData.map((item, idx) => (
        <BubbleSection
          key={item.type}
          item={item}
          index={idx}
          sectionRef={(el) => (refs.current[idx] = el)}
          visible={idx <= visibleIdx}
        />
      ))}
      {showBtn && !showTitle && (
        <div
          ref={continueBtnRef}
          className={`${styles.continueContainer} ${animationComplete ? styles.relative : ''}`}
          onClick={handleContinue}
        >
          <button className={styles.continueBtn}>CLICK TO CONTINUE</button>
        </div>
      )}
      <BigTextSection visible={showTitle} />
    </section>
  );
});

export default Two;
