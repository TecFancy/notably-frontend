import React from "react";

import BasicLayout from "./layouts/basicLayout";
import Slide from "./components/slide";
import Header from "./components/header";
import EditorContent from "./components/editorContent";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <BasicLayout>
      <Slide />
      <div className={styles.contentContainer}>
        <Header />
        <EditorContent />
      </div>
    </BasicLayout>
  );
};

export default App;
