import React, { useEffect, useState } from 'react';
import '../styles/variables-global.scss';
import '../styles/critical.scss';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '../context/ThemeContext';
import { PageProvider } from '../context/PageContext';
import { InteractionProvider } from '../context/InteractionContext';
import { LoadingProvider } from '../context/LoadingContext';
import { AnimationProvider } from '../context/AnimationContext';
import Layout from '../components/layout/Layout';
import { GlobalLoader } from '../components/animations';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { isPerformanceSupported, mark, measure, reportPerformance } from '../utils/performance';
import { loadCriticalResources, executeSideEffects } from '../lib/resourceLoader';

// Dynamic import for non-critical styles
const NonCriticalStyles = dynamic(() => import('../components/common/NonCriticalStyles'), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  // 1. 从页面组件(Component)上获取它自定义的布局选项
  const layoutOptions = Component.layoutOptions || {}; // 如果页面没有定义，则为空对象

  // 2. 让 getLayout 函数也能接收到 layoutOptions
  const getLayout = Component.getLayout || ((page, props) => <Layout {...props}>{page}</Layout>);

  // Initialize to true on server to ensure static generation works and build tools don't crash on empty content.
  // On client, it starts as false to show the loader.
  const [resourcesLoaded, setResourcesLoaded] = useState(typeof window === 'undefined');

  useEffect(() => {
    // If we are on the server, do nothing (useEffect doesn't run anyway)
    if (typeof window === 'undefined') return;

    // Measure initial app load performance
    if (isPerformanceSupported()) {
      const endMark = mark('app-load-end');
      // Measure from navigation start to our mark
      const loadTime = performance.now();
      console.log('App initial load time:', loadTime.toFixed(2), 'ms');

      // Report performance after the page becomes idle
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          reportPerformance();
        });
      } else {
        setTimeout(() => {
          reportPerformance();
        }, 1000);
      }
    }

    // Initialize resources and handle loading sequence
    const initApp = async () => {
      try {
        // 1. Load critical resources (dynamic imports, etc.)
        await loadCriticalResources();

        // 2. Execute registered side effects (animations setup, etc.)
        await executeSideEffects();

        // 3. Mark resources as loaded to render the main app
        setResourcesLoaded(true);

        // 4. Import global styles
        import('../styles/global.scss');

        // 5. Remove static loader only after React is ready to take over
        const staticLoader = document.getElementById('global-loader-static');
        if (staticLoader) {
          staticLoader.style.opacity = '0';
          setTimeout(() => {
            staticLoader.remove();
          }, 300);
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Fallback: show app anyway in case of error
        setResourcesLoaded(true);
      }
    };

    initApp();

    // Register service worker for better performance if in production
    // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/service-worker.js').catch((err) => {
    //       console.error('Service worker registration failed:', err);
    //     });
    //   });
    // }
  }, []);

  return (
    <LoadingProvider waitForResources={!resourcesLoaded}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>iGEM Team 2025 - Synthetic Biology Innovation</title>
      </Head>

      <GlobalLoader fullscreen={true} />

      <div suppressHydrationWarning>
        {(resourcesLoaded || typeof window === 'undefined') && (
          <PageProvider>
            <ThemeProvider>
              <InteractionProvider>
                <AnimationProvider>
                  {getLayout(<Component {...pageProps} />, { layoutOptions })}
                  <NonCriticalStyles />
                </AnimationProvider>
              </InteractionProvider>
            </ThemeProvider>
          </PageProvider>
        )}
      </div>
    </LoadingProvider>
  );
}
export default MyApp;
