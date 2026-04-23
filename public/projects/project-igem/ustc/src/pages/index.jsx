import React, { useEffect, useState, useRef } from 'react';
import { Banner, One, Two, Three, Four } from '../components/home';
import { useInteraction } from '../context/InteractionContext';
import { useLoading } from '../context/LoadingContext';
import Layout from '../components/layout/Layout';
import heading_styles from '../components/layout/ContentPageLayout/ContentPageLayout.module.scss';

// 节流函数，防止滚动过于频繁
const throttle = (fn, ms) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
};

const Home = () => {
  const { setActive, isTwoLocked, setIsTwoLocked, targetBottom } = useInteraction();
  const { finishLoading } = useLoading();
  const [pageBottom, setPageBottom] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const twoRef = useRef(null); // 确定Two.jsx的引用
  const fourRef = useRef(null); // 确定Four.jsx的引用

  useEffect(() => {
    // 设置当前页面为活动页面
    setActive('home');

    // 设置页面标题
    document.title = 'iGEM Team 2025';

    // 主页加载完成检测
    const checkHomePageReady = () => {
      // 检查所有主要组件是否已渲染
      const banner =
        document.querySelector('[data-component="banner"]') || document.querySelector('.banner');
      const one =
        document.querySelector('[data-component="one"]') || document.querySelector('.one');
      const two =
        document.querySelector('[data-component="two"]') || document.querySelector('.two');
      const three =
        document.querySelector('[data-component="three"]') || document.querySelector('.three');
      const four =
        document.querySelector('[data-component="four"]') || document.querySelector('.four');

      // 检查图片是否加载完成
      const images = document.querySelectorAll('img');
      const allImagesLoaded =
        images.length === 0 || Array.from(images).every((img) => img.complete);

      // 如果主要组件都已渲染且图片加载完成，则标记页面准备就绪
      if (banner && one && two && three && four && allImagesLoaded) {
        console.log('🏠 主页加载完成');
        finishLoading();
        return true;
      }
      return false;
    };

    // 延迟检测，确保组件已渲染
    const homePageTimer = setTimeout(() => {
      if (!checkHomePageReady()) {
        // 如果还没准备好，继续检测
        const intervalTimer = setInterval(() => {
          if (checkHomePageReady()) {
            clearInterval(intervalTimer);
          }
        }, 100);

        // 设置最大超时时间
        setTimeout(() => {
          clearInterval(intervalTimer);
          console.log('⏰ 主页加载超时，强制完成');
          finishLoading();
        }, 2000);
      }
    }, 300);

    const customSmoothScroll = (targetY) => {
      const startY = window.scrollY;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = (t) => t * (2 - t);
        const currentY = startY + (targetY - startY) * ease(progress);
        window.scrollTo(0, currentY);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // 节流处理页面滚动
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setPageBottom(window.innerHeight + currentScrollY);
      const viewportHeight = window.innerHeight;
      const currentPageBottom = currentScrollY + viewportHeight;

      // console.log('debug: currentPageBottom', currentPageBottom, 'targetBottom', targetBottom);

      // 设置活动部分
      if (currentScrollY < viewportHeight * 0.8) setActive('banner');
      else if (currentScrollY < viewportHeight * 1.8) setActive('one');
      else if (currentScrollY < viewportHeight * 2.8) setActive('two');
      else if (currentScrollY < viewportHeight * 3.8) setActive('three');
      else if (currentScrollY < viewportHeight * 4.8) setActive('four');
      else setActive('five');

      // Two.jsx的滚动拦截逻辑
      // 检查Four组件是否与视窗下边沿相交
      let shouldPreventRollback = false;
      if (fourRef.current) {
        const fourRect = fourRef.current.getBoundingClientRect();
        const viewportBottom = window.innerHeight;
        // 当Four组件的顶部与视窗下边沿相交时，不触发回滚
        shouldPreventRollback = fourRect.top <= viewportBottom;
      }

      if (
        isTwoLocked &&
        targetBottom > 0 &&
        currentPageBottom > targetBottom &&
        !shouldPreventRollback
      ) {
        const targetScrollY = targetBottom - viewportHeight;
        console.log('debug: Rolling back to', targetScrollY);
        window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'auto' });
        // customSmoothScroll(Math.max(0, targetScrollY));

        // 验证和纠正
        setTimeout(() => {
          const actualY = window.scrollY;
          console.log('debug: Actual scrollY after rollback:', actualY);
          const tolerance = 6; // 防止抖动引起回滚
          if (Math.abs(actualY - targetScrollY) > tolerance) {
            console.log('debug: Correcting rollback to', targetScrollY);
            window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'auto' });
          }
        }, 200);

        // 暂时阻止用户行为触发滚动
        const preventDownward = (e) => {
          if (e.deltaY > 0) e.preventDefault();
        };
        const preventKeyDown = (e) => {
          if (['ArrowDown', 'PageDown', ' '].includes(e.key)) e.preventDefault();
        };
        const preventTouchMove = (e) => {
          if (e.touches.length > 0) e.preventDefault();
        };

        window.addEventListener('wheel', preventDownward, { passive: false });
        window.addEventListener('keydown', preventKeyDown, { passive: false });
        window.addEventListener('touchmove', preventTouchMove, { passive: false });

        setTimeout(() => {
          window.removeEventListener('wheel', preventDownward);
          window.removeEventListener('keydown', preventKeyDown);
          window.removeEventListener('touchmove', preventTouchMove);
        }, 100);
      }
    }, 20);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // 清理主页加载检测定时器
      if (homePageTimer) {
        clearTimeout(homePageTimer);
      }
    };
  }, [setActive, isTwoLocked, targetBottom, finishLoading]);

  // 返回组件树
  return (
    /*<>...</>是React Fragment的简写语法，它允许在不添加额外DOM节点的情况下对多个元素进行分组。等同于：
      <React.Fragment>
        <Banner />
        <One />
        <Two />
        <Three />
        <Four />
      </React.Fragment>
     */
    <>
      <Banner />
      <One />
      <Two ref={twoRef} />
      <Three />
      <Four ref={fourRef} />
    </>
  );
};

// 使用Next.js特性，getLayout方法可以自定义布局
Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
