import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../context/ThemeContext';
import { navLinks } from '../../../config/navigation';
import styles from './Header.module.scss';
import ScrollToTop from '../../common/ScrollToTop/ScrollToTop';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link href="/">USTC-iGEM</Link>
        </div>

        <button
          className={`${styles.mobileMenuToggle} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.icon}></span>
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li
                key={link.title}
                className={`${styles.navItem} ${link.subLinks ? styles.dropdown : ''}`}
              >
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={() => !link.subLinks && setMenuOpen(false)}
                >
                  {link.title}
                </Link>

                {link.subLinks && (
                  <ul className={styles.dropdownMenu}>
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.title}>
                        <Link
                          href={subLink.href}
                          className={styles.navLink}
                          onClick={() => setMenuOpen(false)}
                        >
                          {subLink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className={styles.navItem}>
              <Link
                href="/"
                className={`${styles.navLink} ${styles.homeLink}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <ScrollToTop />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
