'use client';
import React from 'react';
import styles from './GridLayer.module.scss';

// 这个组件只负责渲染底层的、会自动滚动的网格背景
const GridLayer = () => {
  return <div className={styles.grid}></div>;
};

export default GridLayer;
