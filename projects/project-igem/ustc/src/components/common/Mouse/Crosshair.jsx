/*
 * File:       components/common/Mouse/Crosshair.jsx
 * Author:     Waverly <waverlyowen@mail.ustc.edu.cn>
 * Date:       2025-08-01
 */

import React, { useEffect, useRef, useState } from 'react';
import styles from './Crosshair.module.scss';

const Crosshair = () => {
  const containerRef = useRef(null);
  const crosshairRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);
  const velocity = useRef({ x: 0, y: 0 });
  const target = useRef({ x: -100, y: -100 });

  const [position, setPosition] = useState({ x: -100, y: -100 });

  // Configurable constants
  const CONFIG = {
    BORDER_FACTOR: 0.2,
    MIN_BORDER: 5,
    MIN_LINE_THICKNESS: 4,
    ROTATE_FACTOR: 5,
    MIN_LENGTH: 35,
    LENGTH_FACTOR: 1,
    SHIFT_FACTOR: 0.5,
    MIN_SHIFT: 10,
    ACCEL_FACTOR: 0.015,
    MAX_INTERVAL: 100,
    FRICTION: 0.85,
    SNAP_THRESHOLD: 1.0,
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (delta > CONFIG.MAX_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const { x: tx, y: ty } = target.current;
      const { x: cx, y: cy } = position;
      const dx = tx - cx;
      const dy = ty - cy;
      const distance = Math.hypot(dx, dy);

      if (distance < CONFIG.SNAP_THRESHOLD) {
        setPosition(target.current);
        containerRef.current.style.left = `${tx}px`;
        containerRef.current.style.top = `${ty}px`;
        velocity.current = { x: 0, y: 0 };
      } else {
        const ax = dx * CONFIG.ACCEL_FACTOR;
        const ay = dy * CONFIG.ACCEL_FACTOR;

        velocity.current.x = (velocity.current.x + ax) * CONFIG.FRICTION;
        velocity.current.y = (velocity.current.y + ay) * CONFIG.FRICTION;

        const newX = cx + velocity.current.x;
        const newY = cy + velocity.current.y;

        setPosition({ x: newX, y: newY });
        containerRef.current.style.left = `${newX}px`;
        containerRef.current.style.top = `${newY}px`;

        if (crosshairRef.current) {
          const speed = Math.hypot(velocity.current.x, velocity.current.y);
          crosshairRef.current.style.setProperty('--line-rotate', `${ax * CONFIG.ROTATE_FACTOR}deg`);
          crosshairRef.current.style.setProperty('--circle-thickness', `${speed * CONFIG.BORDER_FACTOR + CONFIG.MIN_BORDER}px`);
          crosshairRef.current.style.setProperty('--line-thickness', `${speed * CONFIG.BORDER_FACTOR + CONFIG.MIN_LINE_THICKNESS}px`);
          crosshairRef.current.style.setProperty('--line-length', `${CONFIG.MIN_LENGTH - speed * CONFIG.LENGTH_FACTOR}px`);
          crosshairRef.current.style.setProperty('--line-shift', `${CONFIG.MIN_SHIFT + speed * CONFIG.SHIFT_FACTOR}px`);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [position]);

  return (
    <div className={styles.crosshairContainer} ref={containerRef}>
      <div className={styles.crosshair} ref={crosshairRef}>
        <div className={styles.circle} />
        <div className={`${styles.line} ${styles.left}`} />
        <div className={`${styles.line} ${styles.right}`} />
        <div className={`${styles.line} ${styles.top}`} />
        <div className={`${styles.line} ${styles.bottom}`} />
      </div>
    </div>
  );
};

export default Crosshair;
