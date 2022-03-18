import React from "react";
import Editor from "./components/editor";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Editor />
    </div>
  );
};

export default App;
