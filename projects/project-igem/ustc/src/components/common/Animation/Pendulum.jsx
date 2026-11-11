"use client";
/*
 * File:       components/common/Animation/Pendulum.jsx
 * Author:     Waverly <waverlyowen@mail.ustc.edu.cn>
 * Date:       2025-08-02
 */

import { useEffect, useRef, useState } from "react";
import styles from "./Pendulum.module.scss";

const Pendulum = ({
  length = 200,         // 绳长（像素）
  angle0 = Math.PI / 4, // 初始角度
  damping = 0.02,       // 阻尼系数
  gravity = 9.8,        // 重力加速度
  children              // 摆球内容（图片或任意 div）
}) => {
  const [angle, setAngle] = useState(angle0);
  const bobRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    let theta = angle0;
    let omega = 0;

    const update = () => {
      const alpha = (-gravity / length) * Math.sin(theta) - damping * omega;
      omega += alpha;
      theta += omega;

      // 阈值停止
      if (Math.abs(omega) < 0.0005 && Math.abs(theta) < 0.002) {
        theta = 0;
        omega = 0;
        cancelAnimationFrame(animationRef.current);
      } else {
        animationRef.current = requestAnimationFrame(update);
      }

      setAngle(theta);
    };

    update();

    return () => cancelAnimationFrame(animationRef.current);
  }, [angle0, damping, length, gravity]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.string}
        style={{
          height: `${length}vw`,
          transform: `rotate(${angle}rad)`
        }}
      >
        <div className={styles.bob} ref={bobRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Pendulum;
