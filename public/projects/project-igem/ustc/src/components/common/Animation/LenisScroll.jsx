'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      direction: 'vertical',
      gestureDirection: 'vertical',
      mouseMultiplier: 1.5,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    function onLinkClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();

      const id = anchor.getAttribute('href').substring(1);
      const element = document.getElementById(id);
      if (element) {
        lenis.scrollTo(element, { duration: 5.0, offset: 0 });
        history.pushState(null, '', `#${id}`);
      }
    }

    function onHashChange() {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        lenis.scrollTo(element, { duration: 5.0, offset: 0 })
      }
    }

    window.addEventListener('click', onLinkClick)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      lenis.destroy()
      window.removeEventListener('click', onLinkClick)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return null
}
