import React, { useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { ScrollToTop } from '../common';
import { useTheme } from '../../context/ThemeContext';
import { usePageLoadDetection } from '../../hooks';
import Grid from '../common/Background/Grid';
import Crosshair from '../common/Mouse/Crosshair';
import styles from './Layout.module.scss';
import eventBus from '../../utils/eventBus';
import { throttle } from '../../lib/utils';
import LenisScroll from '../common/Animation/LenisScroll';

const Layout = ({ children, layoutOptions }) => {
  const { theme } = useTheme();

  // 启用页面加载检测
  usePageLoadDetection();

  // 2. 从 props 中读取 showGrid 的值，如果 prop 不存在，则默认为 true (显示)
  const showGrid = layoutOptions?.showGrid ?? true;

  useEffect(() => {
    // 读取并设置header高度的函数
    const setHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        document.documentElement.style.setProperty('--current-header-height', `${height}px`);
      }
    };

    // 节流版本，防止过于频繁调用
    const throttledSetHeaderHeight = throttle(setHeaderHeight, 100);

    // 初始化
    setHeaderHeight();

    // 窗口大小改变时重新设置
    window.addEventListener('resize', throttledSetHeaderHeight);

    // 监听滚动时同步设置header高度（修复header滚动时变化的问题）
    window.addEventListener('scroll', throttledSetHeaderHeight, { passive: true });

    const handleScroll = throttle(() => {
      eventBus.emit('page:scroll', {
        position: window.scrollY,
        direction: window.scrollY > (window._lastScrollY || 0) ? 'down' : 'up',
        timestamp: Date.now(),
      });
      window._lastScrollY = window.scrollY;
    }, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 清理
    return () => {
      window.removeEventListener('resize', throttledSetHeaderHeight);
      window.removeEventListener('scroll', throttledSetHeaderHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.layout} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <Header />
      {showGrid && <Grid />}
      <LenisScroll />
      <Crosshair />
      <main className={styles.main}>{children}</main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
