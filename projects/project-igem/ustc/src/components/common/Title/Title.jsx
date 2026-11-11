import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.scss';

/**
 * 通用的标题组件，支持 h1-h6 标签
 * @param {object} props - 组件属性
 * @param {React.ReactNode} props.children - 标题内容
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [props.as='h1'] - 渲染的 HTML 标签
 * @param {string} [props.className] - 额外的 CSS 类名
 */
const Title = ({ children, as: Component = 'h1', className = '' }) => {
  return (
    <Component className={`${styles.title} ${styles[Component]} ${className}`}>
      {children}
    </Component>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
};

export default Title;