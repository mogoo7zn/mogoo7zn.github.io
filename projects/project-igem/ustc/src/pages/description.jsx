import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import dynamic from 'next/dynamic';
// 导入主布局和我们新建的页面模板布局
import Layout from '../components/layout/Layout';
import ContentPageLayout from '../components/layout/ContentPageLayout/ContentPageLayout';
import heading_styles from '../components/layout/ContentPageLayout/ContentPageLayout.module.scss';

const DescriptionMd = dynamic(() => import('../md/description.md'), { ssr: false });

const DescriptionPage = () => {
  const initialPageData = {
    title: 'Description',
    description: 'Project overview & purpose',
    sections: [],
  };
  const [pageData, setPageData] = useState(initialPageData);

  useEffect(() => {
    let observer = null;
    let checkTimer = null;

    const extractHeadings = (container) => {
      const sections = Array.from(container.querySelectorAll('section'));
      console.log('[extractHeadings] Found sections:', sections.length);

      const data = sections.map((section, i) => {
        const id = section.getAttribute('id') || `section-${i + 1}`;
        
        // 找到标题
        const titleEl = section.querySelector(`.${heading_styles.title}`);
        const titleText = titleEl ? titleEl.innerText.trim() : `Section ${i + 1}`;

        // 查找子目录 ul（路径：section -> div.section-content -> ul.itemization）
        const subItems = [];
        const ul = section.querySelector(`.${heading_styles['section-content']} ul.itemization`);
        if (ul) {
          const liNodes = ul.querySelectorAll('li');
          liNodes.forEach((li, j) => {
            // 每个 li 里的第一个 p
            const p = li.querySelector('p');
            let text = '';
            if (p) {
              // 找 p 内部最内层的 .plain span
              const plain = p.querySelector(`.${heading_styles.plain}`);
              if (plain) {
                text = plain.textContent.trim();
              } else {
                // fallback：取 p 的 innerText
                text = p.innerText.trim();
              }
            }

            if (text) {
              const subId = li.getAttribute('id') || `${id}-sub-${j + 1}`;
              subItems.push({
                type: 'subsection',
                id: subId,
                text,
              });
            }
          });
        }

        return {
          type: 'heading',
          id,
          text: titleText,
          subsections: subItems,
        };
      });

      console.log('[extractHeadings] Extracted structure:', data);
      setPageData((prev) => ({
        ...prev,
        sections: data,
      }));
    };

    const initObserver = () => {
      const container = document.querySelector('.react-rendered-content');
      if (!container) return false;

      console.log('[local] Found container:', container);

      observer = new MutationObserver(() => {
        const sections = container.querySelectorAll('section');
        if (sections.length > 0) {
          console.log('[observer] Detected section render');
          extractHeadings(container);
          observer.disconnect();
          clearInterval(checkTimer);
        }
      });

      observer.observe(container, { childList: true, subtree: true });

      // 如果页面已经渲染好了，手动执行一次
      const sections = container.querySelectorAll('section');
      if (sections.length > 0) {
        console.log('[manual-check] Sections already rendered');
        extractHeadings(container);
        observer.disconnect();
        clearInterval(checkTimer);
      }
      return true;
    };

    // 定时检查 container 是否出现（防止动态渲染延迟）
    checkTimer = setInterval(() => {
      const found = initObserver();
      if (found) clearInterval(checkTimer);
    }, 300);

    return () => {
      clearInterval(checkTimer);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <ContentPageLayout pageData={pageData}>
      <DescriptionMd />
    </ContentPageLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'static', 'data', 'project', 'description.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const pageData = JSON.parse(jsonData);
  pageData.sections = [];

  return {
    props: {
      pageData,
    },
  };
}

// getLayout 模式保持不变，用于应用最外层的网站布局
DescriptionPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

DescriptionPage.layoutOptions = {
  showGrid: false, // 明确指令：不显示 Grid
};

export default DescriptionPage;
