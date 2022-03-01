import React from "react";
import { editor } from "monaco-editor";

import Editor from "./components/editor";

import styles from "./App.module.scss";

const App: React.FC = () => {
  console.log("manoco", editor);

  return (
    <div className={styles.App}>
      <Editor />
    </div>
  );
};

export default App;
