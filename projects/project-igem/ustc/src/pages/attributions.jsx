import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Layout from '../components/layout/Layout';
import ContentPageLayout from '../components/layout/ContentPageLayout/ContentPageLayout';
import Head from 'next/head';
import heading_styles from '../components/layout/ContentPageLayout/ContentPageLayout.module.scss';

const AttributionsPage = ({ pageData }) => {
  // iframe height listener script
  useEffect(() => {
    const iframe = document.getElementById('igem-attribution-form');
    if (iframe) {
      const handleMessage = (event) => {
        if (event.origin !== 'https://teams.igem.org') return;

        if (event.data.type === 'resize') {
          iframe.style.height = event.data.height + 'px';
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Attributions - iGEM USTC 2025</title>
        <meta
          name="description"
          content="Acknowledging everyone who helped make our project possible."
        />
      </Head>
      <ContentPageLayout pageData={pageData}>
        <div style={{ marginTop: '2rem' }}>
          <iframe
            style={{ width: '100%', height: '600px', border: 'none' }}
            id="igem-attribution-form"
            src="https://teams.igem.org/wiki/5924/attributions"
            title="iGEM Attributions Form"
            loading="lazy"
          />
        </div>
      </ContentPageLayout>
    </>
  );
};

export async function getStaticProps() {
  // ✅ 只需要修改这一行，指向新的 JSON 文件
  const filePath = path.join(process.cwd(), 'static', 'data', 'team', 'attributions.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const pageData = JSON.parse(jsonData);

  return { props: { pageData } };
}

AttributionsPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

AttributionsPage.layoutOptions = {
  showGrid: false, // 明确指令：不显示 Grid
};

export default AttributionsPage;
