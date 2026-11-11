import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Layout from '../components/layout/Layout';
import ContentPageLayout from '../components/layout/ContentPageLayout/ContentPageLayout';
import heading_styles from '../components/layout/ContentPageLayout/ContentPageLayout.module.scss';

const CollaborationPage = ({ pageData }) => {
  return <ContentPageLayout pageData={pageData} />;
};

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    'static',
    'data',
    'human-practices',
    'collaboration.json'
  );
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const pageData = JSON.parse(jsonData);
  pageData.sections = [];

  return { props: { pageData } };
}

CollaborationPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

CollaborationPage.layoutOptions = {
  showGrid: false, // 明确指令：不显示 Grid
};

export default CollaborationPage;
