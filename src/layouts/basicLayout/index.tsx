/**
 * @description 基础布局
 */

import React from "react";

import styles from "./index.module.scss";

interface PropsType {
  children: React.ReactElement;
}

const BasicLayout: React.FC<PropsType> = (props) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default BasicLayout;
