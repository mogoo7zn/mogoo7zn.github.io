'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * 一个自定义的 Hook，用于检测元素是否进入视口
 * @param {object} options - IntersectionObserver 的配置对象
 * @returns {[React.MutableRefObject, boolean]} - 返回一个 ref 和一个 inView 状态
 */
export function useCustomInView(options) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null); // 这个 ref 将被绑定到要观察的 DOM 元素上

  useEffect(() => {
    const element = ref.current;
    if (!element) return; // 确保元素存在

    // 创建一个 IntersectionObserver 实例
    const observer = new IntersectionObserver(([entry]) => {
      // 当元素的交叉状态改变时，这个回调函数会被触发
      
      // 我们只关心它是否进入视口
      if (entry.isIntersecting) {
        setInView(true); // 更新状态为 true

        // 如果设置了 triggerOnce，则在触发后立即停止观察
        if (options?.triggerOnce) {
          observer.unobserve(element);
        }
      } else {
        // 如果没有设置 triggerOnce，则元素离开视口时可以更新状态为 false
        if (!options?.triggerOnce) {
          setInView(false);
        }
      }
    }, options);

    // 开始观察元素
    observer.observe(element);

    // 关键：在组件卸载或依赖项变化时，停止观察，清理 observer
    return () => {
      observer.disconnect();
    };
  }, [ref, options]); // 依赖于 ref 和 options

  return [ref, inView];
}