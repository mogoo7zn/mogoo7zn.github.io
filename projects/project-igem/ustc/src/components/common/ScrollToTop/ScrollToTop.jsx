import React, { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // 监听滚动事件，控制按钮显示/隐藏
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button 
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="返回顶部"
    >
      <div className={styles.arrowContainer}>
        <div className={styles.arrowHead}></div>
        <div className={styles.arrowStem}></div>
      </div>
    </button>
  );
};

export default ScrollToTop;