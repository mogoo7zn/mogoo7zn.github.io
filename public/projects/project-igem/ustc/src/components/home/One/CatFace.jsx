'use client';

import { useEffect, useRef, useState } from 'react';
import Magnet from '../../common/Animation/Magnet';
import styles from './CatFace.module.scss';

const ANIMATION_DURATION = 1000;
const CatFace = () => {
  const leftEarRef = useRef(null);
  const rightEarRef = useRef(null);

  const isNearLeftRef = useRef(false);
  const isNearRightRef = useRef(false);

  const leftAnimEndRef = useRef(0);
  const rightAnimEndRef = useRef(0);

  const [isLeftNear, setIsLeftNear] = useState(false);
  const [isRightNear, setIsRightNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const checkProximity = (ref, isNearRef, setIsNear, animEndRef) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const nowNear = distance < 300;
        const now = Date.now();

        if (nowNear !== isNearRef.current) {
          if (nowNear) {
            isNearRef.current = true;
            animEndRef.current = now + ANIMATION_DURATION;
            setIsNear(true);
          } else {
            const delay = animEndRef.current - now;
            if (delay > 0) {
              setTimeout(() => {
                if (isNearRef.current) return;
                setIsNear(false);
              }, delay);
            } else {
              isNearRef.current = false;
              setIsNear(false);
            }
            isNearRef.current = false;
          }
        }
      };

      checkProximity(leftEarRef, isNearLeftRef, setIsLeftNear, leftAnimEndRef);
      checkProximity(rightEarRef, isNearRightRef, setIsRightNear, rightAnimEndRef);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <a href="#one" style={{ cursor: 'pointer', pointerEvents: 'auto'}}>
      <Magnet wrapperClassName={styles.magnet} innerClassName={styles.inner} a={0.8} magnetStrength={10} padding='50vw'>
        <svg className={styles.catSvg} viewBox="-10 -50 842.65 951.8">
          <g className={styles.catGroup}>
              <circle className={styles.body} cx="383.46" cy="418.89" r="190.99" />

              <path
              ref={leftEarRef}
              className={`${styles.leftEar} ${isLeftNear ? styles.shake : ''}`}
              d="M173.14,318.33c.1.21.4.22.51.02,2.29-4.32,19.24-35.3,47.93-63.15,28.09-27.27,65.58-44.05,70.42-46.16.22-.09.23-.39.02-.51L93.6,96.38c-9.76-5.51-20.85,4.71-16.15,14.89l95.69,207.06Z"
              />

              <path
              ref={rightEarRef}
              className={`${styles.rightEar} ${isRightNear ? styles.shake : ''}`}
              d="M529.17,239.66c0,.24-.27.37-.46.23-3.89-2.95-32.29-23.95-70.04-37.16-36.95-12.94-78.02-12.42-83.29-12.29-.24,0-.37-.26-.23-.45L508.06,4.83c6.54-9.1,20.9-4.49,20.91,6.72l.19,228.1Z"
              />

              <path
              className={styles.tail}
              d="M347.09,606.24s-101.86-30.01-183.41-23.52c-77.75,6.19-41.23,49.89,24.26,73.54,65.48,23.65,100.59,31.57,146.7,72.62,46.11,41.06,44.94,111.62-32.77,119.7-77.71,8.08-185.3-110.89-247.74-105.86-62.45,5.02-20.08,73.48-20.08,73.48"
              />
          </g>
        </svg>
        <svg className={styles.catSvg} viewBox="-10 -50 842.65 951.8">
          <g className={styles.catGroup}>
              <ellipse className={styles.leftEye} cx="425.75" cy="383.88" rx="18.64" ry="60.48" />
              <ellipse className={styles.rightEye} cx="488.51" cy="381.15" rx="18.64" ry="60.48" />
              <circle className={styles.leftHand} cx="428.94" cy="582.59" r="59.11" />
              <circle className={styles.rightHand} cx="563.54" cy="570.77" r="59.11" />
              <circle className={styles.tailBall} cx="56.97" cy="854.52" r="27.28" />
          </g>
        </svg>
      </Magnet>
    </a>
  );
};

export default CatFace;
