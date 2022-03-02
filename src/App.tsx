import React, { useEffect } from "react";
import { editor } from "monaco-editor";
import githubTheme from "monaco-themes/themes/GitHub.json";

import styles from "./App.module.scss";

import type { IKeyboardEvent } from "monaco-editor";

const App: React.FC = () => {
  useEffect(() => {
    const instance = editor.create(
      document.querySelector(`.${styles.editorInner}`) as HTMLDivElement,
      {
        language: "markdown",
        lineNumbers: "off",
        roundedSelection: false,
        minimap: {
          enabled: false,
        },
      }
    );
    editor.defineTheme("github", githubTheme as any);
    instance.onKeyUp((keyUpEvent: IKeyboardEvent) => {
      const target = keyUpEvent.target as HTMLInputElement;
      target.setAttribute("value", "test");
      console.log(instance.getPosition(), target.value, instance.getValue());
    });
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarInner}>Slide</div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>Header</div>
        <div className={styles.pageTitle}>
          <div className={styles.pageTitleInner}>Page Title</div>
        </div>
        <div className={styles.editor}>
          <div className={styles.editorInner} />
        </div>
      </div>
    </div>
  );
};

export default App;
