// components/common/Grid.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Grid.module.scss';

const Grid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    let mouseX = 0, mouseY = 0;
    let scrollX = window.scrollX;
    let scrollY = window.scrollY;
    let ticking = false;

    const updatePosition = () => {
      // X 方向正常滚动，Y 方向滚动只取 scrollY 的 1/10
      grid.style.backgroundPosition = `${-scrollX + mouseX}px ${-scrollY * 0.2 + mouseY}px`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
      requestTick();
    };

    const handleScroll = () => {
      scrollX = window.scrollX;
      scrollY = window.scrollY;
      requestTick();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 初始化调用一次
    scrollX = window.scrollX;
    scrollY = window.scrollY;
    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={gridRef} className={styles.grid} />;
};

export default Grid;
