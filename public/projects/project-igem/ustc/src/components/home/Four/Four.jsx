import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import styles from './Four.module.scss';

const InfoCard = ({ title, content, imageSrc }) => {
  // 提取首字母和剩余部分
  const firstLetter = title.charAt(0);
  const restOfTitle = title.slice(1);

  return (
    <div className={styles.infoCard}>
      <div className={styles.titleCapsule}>
        <span className={styles.firstLetter}>{firstLetter}</span>
        {restOfTitle}
      </div>
      <div className={styles.cardContent}>
        <img src={imageSrc} alt={title} className={styles.cardImage} />
        <p>{content}</p>
      </div>
    </div>
  );
};

const Four = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref && ref.current) {
        observer.disconnect();
      }
    };
  }, [ref, handleIntersection]);

  const infoCardData = [
    {
      title: 'Simple',
      imageSrc: 'https://static.igem.wiki/teams/5924/assets/images/simple.webp',
      content:
        'Our system is designed for ease of use, providing straightforward results that are easy to interpret.',
    },
    {
      title: 'Precise',
      imageSrc: 'https://static.igem.wiki/teams/5924/assets/images/precise.webp',
      content:
        'With cutting-edge technology, we ensure accurate detection and quantification of toxins, critical for safety.',
    },
    {
      title: 'Yeasty',
      imageSrc: 'https://static.igem.wiki/teams/5924/assets/images/yeasty.webp',
      content:
        'Harnessing the power of yeast, our biological approach offers a natural and efficient solution for toxin detection.',
    },
  ];

  return (
    <section ref={ref} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.contentWrapper}>
        {/* 第一个盒子 */}
        <div className={`${styles.box} ${styles.box1}`}>
          <h1>So we create</h1>
        </div>

        {/* 第二个盒子 */}
        <div className={`${styles.box} ${styles.box2}`}>
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/logo.webp"
            alt="Logo"
            className={styles.logo}
          />
        </div>

        {/* 第三个盒子 */}
        <div className={`${styles.box} ${styles.box3}`}>
          <p>
            To achieve this, we develop a dual-yeast system, which accepts the signal of BoNT/A's
            activity and quantitively reflect it with pigment, rendering fast amount-measurement
            possible. By integrating this system, we expect our product wide use in both beauty
            clinic industry and daily detection.
          </p>
        </div>

        {/* 第四个盒子 - 修改为三个信息卡片 */}
        <div className={`${styles.box} ${styles.box4}`}>
          <div className={styles.sectionIntro}>
            Our project <span className={styles.spyHighlight}>S.P.Y.</span> features in:
          </div>
          <div className={styles.infoCardsContainer}>
            {infoCardData.map((card, index) => (
              <InfoCard
                key={index}
                title={card.title}
                content={card.content}
                imageSrc={card.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Four;
