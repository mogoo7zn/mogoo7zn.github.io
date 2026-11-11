import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Layout from '../components/layout/Layout';
import MembersPageLayout from '../components/layout/MembersPageLayout/MembersPageLayout';
import heading_styles from '../components/layout/ContentPageLayout/ContentPageLayout.module.scss';
import ContentPageLayout from '../components/layout/ContentPageLayout/ContentPageLayout';

const MembersPage = ({ pageData }) => {
  return <MembersPageLayout pageData={pageData} />;
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'static', 'data', 'team', 'members.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const pageData = JSON.parse(jsonData);

  return { props: { pageData } };
}

// 3. 将 getLayout 方法附加到新的 MembersPage 组件上
MembersPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

MembersPage.layoutOptions = {
  showGrid: false, // 明确指令：不显示 Grid
};

// 4. 默认导出新的 MembersPage 组件
export default MembersPage;
