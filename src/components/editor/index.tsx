/**
 * @description 编辑器
 */

import React, { useEffect } from "react";
import { editor } from "monaco-editor";

import styles from "./index.module.scss";

const Editor: React.FC = () => {
  useEffect(() => {
    editor.create(
      document.querySelector(`.${styles.container}`) as HTMLDivElement,
      {
        language: "markdown",
        lineNumbers: "off",
        roundedSelection: false,
        minimap: {
          enabled: false,
        },
      }
    );
  }, []);

  return <div className={styles.container} />;
};

export default Editor;
