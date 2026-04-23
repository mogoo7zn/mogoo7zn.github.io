import { useState, useEffect } from 'react';

/**
 * 一个自定义 Hook，用于安全地（只在客户端）获取并监控 Header 的实时高度。
 * 它会优先尝试读取 '--current-header-height' 这个 CSS 变量，
 * 如果失败，则回退到直接测量 <header> 元素的实际高度。
 * @returns {number} Header 的当前高度（像素值）
 */
export function useHeaderHeight() {
  // 为高度设置一个 state，并提供一个常见的高度作为初始默认值
  const [height, setHeight] = useState(70);

  // 使用 useEffect 确保所有操作只在客户端（浏览器）执行
  useEffect(() => {
    // 将更新高度的逻辑封装成一个函数
    const updateHeight = () => {
      // 确保在浏览器环境中
      if (typeof window !== 'undefined') {
        // 尝试从 CSS 自定义变量中获取高度
        const headerHeightString = getComputedStyle(document.documentElement).getPropertyValue('--current-header-height');
        
        // 如果 CSS 变量有值，则解析它
        if (headerHeightString) {
          setHeight(parseInt(headerHeightString, 10) || 70);
        } else {
          // 如果没有 CSS 变量，作为备用方案，直接测量 header 元素
          const headerEl = document.querySelector('header');
          setHeight(headerEl ? headerEl.offsetHeight : 70);
        }
      }
    };

    // 1. 组件挂载后立即执行一次，获取初始高度
    updateHeight();
    
    // 2. 监听窗口尺寸变化事件，当窗口大小改变时重新计算高度
    window.addEventListener('resize', updateHeight);

    // 3. 组件卸载时，返回一个清理函数，移除事件监听以防止内存泄漏
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []); // 空依赖数组 [] 意味着这个 effect 只在组件首次挂载和卸载时运行

  // 返回实时的高度值
  return height;
}