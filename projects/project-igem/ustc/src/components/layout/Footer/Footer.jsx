import React, { useMemo, memo } from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

// 缓存单个链接组件，避免重复创建
const FooterLink = memo(({ href, children }) => (
  <li>
    <Link href={href}>{children}</Link>
  </li>
));

FooterLink.displayName = 'FooterLink';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  // 缓存导航链接数据
  const navigationData = useMemo(
    () => [
      {
        title: 'Project',
        links: [
          { title: 'Description', href: '/description' },
          { title: 'Design', href: '/design' },
          { title: 'Contribution', href: '/contribution' },
          { title: 'Implementation', href: '/implementation' },
          { title: 'Proof of Concept', href: '/proof-of-concept' },
          { title: 'Engineering', href: '/engineering' },
          { title: 'Safety & Security', href: '/safety' },
        ],
      },
      {
        title: 'Wet Lab',
        links: [
          { title: 'Part Page', href: '/parts' },
          { title: 'Protocol', href: '/protocol' },
          { title: 'Notebook', href: '/notebook' },
          { title: 'Results', href: '/results' },
        ],
      },
      {
        title: 'Dry Lab',
        links: [{ title: 'Model', href: '/model' }],
      },
      {
        title: 'Human Practices',
        links: [
          { title: 'Integrated Human Practices', href: '/human-practices' },
          { title: 'Education', href: '/education' },
        ],
      },
      {
        title: 'Team',
        links: [
          { title: 'Roster', href: '/members' },
          { title: 'Attributions', href: '/attributions' },
        ],
      },
    ],
    []
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {navigationData.map((section) => (
            <div key={section.title} className={styles.section}>
              <h4 className={styles.sectionTitle}>{section.title}</h4>
              <ul className={styles.links}>
                {section.links.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.title}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.logoContainer}>
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/ustc-biorender.avif"
            alt="BioRender Logo"
            className={styles.logo}
          />
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/ustc-sangon.avif"
            alt="Sengong"
            className={styles.logo}
          />
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/ustc-logo.webp"
            alt="USTC Logo"
            className={styles.logo}
          />
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/ustc-biologo.webp"
            alt="USTC Biology Logo"
            className={styles.logo}
          />
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/ustc-bilibili.webp"
            alt="USTC Bilibili Logo"
            className={styles.logo}
          />
          <img
            src="https://static.igem.wiki/teams/5924/assets/images/igem-goldmedal-ustc.avif"
            alt="Gold Medal"
            className={styles.logo}
          />
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Contact Us</h3>
          <div className={styles.contactInfo}>
            <p className={styles.contactText}>Sina weibo: @USTC-iGEM</p>
            <p className={styles.contactText}>Email: igem_ustc@163.com</p>
            <p className={styles.contactAddress}>
              University of Science and Technology of China, No.96, JinZhai Road, Baohe District,
              Hefei, Anhui, 230026, P.R.China
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} - Content on this site is licensed under a Creative Commons Attribution
            4.0 International license.
          </p>
          <p className={styles.repository}>
            The repository used to create the website is available at{' '}
            <a
              href="https://gitlab.igem.org/2025/ustc"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoLink}
            >
              https://gitlab.igem.org/2025/ustc
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
