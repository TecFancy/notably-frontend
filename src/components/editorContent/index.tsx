/**
 * @description 编辑器容器
 */

import React from "react";
import PageTitle from "../pageTitle";
import Editor from "../editor";

import styles from "./index.module.scss";

const EditorContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <PageTitle />
      <Editor />
    </div>
  );
};

export default EditorContent;
