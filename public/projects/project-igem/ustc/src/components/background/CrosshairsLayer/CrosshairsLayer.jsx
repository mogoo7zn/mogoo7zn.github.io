'use client';
import React, { useRef, useEffect } from 'react';
import styles from './CrosshairsLayer.module.scss';

//十字准星
const CrosshairsLayer = () => {
  const crossHairsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (crossHairsRef.current) {
        const { clientX, clientY } = event;
        crossHairsRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        crossHairsRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.crosshairsContainer} ref={crossHairsRef}>
      <div className={styles.crosshairs}></div>
    </div>
  );
};

export default CrosshairsLayer;
