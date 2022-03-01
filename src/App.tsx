import React from "react";
import { editor } from "monaco-editor";

import Editor from "./components/editor";

// import styles from "./App.module.scss";
import BasicLayout from "./layouts/basicLayout";

const App: React.FC = () => {
  console.log("manoco", editor);

  return (
    <BasicLayout>
      <Editor />
    </BasicLayout>
  );

  // return (
  //   <div className={styles.App}>
  //     <Editor />
  //   </div>
  // );
};

export default App;
