import React from 'react';
import PropTypes from 'prop-types';
import styles from './Paragraph.module.scss';

/**
 * 通用的段落组件
 * @param {object} props - 组件属性
 * @param {React.ReactNode} props.children - 段落内容
 * @param {string} [props.className] - 额外的 CSS 类名
 */
const Paragraph = ({ children, className = '' }) => {
  return (
    <p className={`${styles.paragraph} ${className}`}>
      {children}
    </p>
  );
};

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Paragraph;