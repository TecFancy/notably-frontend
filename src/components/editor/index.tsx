import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, ViewPlugin } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";

import styles from "./index.module.scss";

const Editor = () => {
  useEffect(() => {
    const editorState = EditorState.create({
      doc: "# Heading 1\n\n## Heading 2\n",
      extensions: [
        history(),
        markdown({
          extensions: [{}],
        }),
        keymap.of([...defaultKeymap, ...historyKeymap, ...markdownKeymap]),
      ],
    });
    new EditorView({
      state: editorState,
      parent: document.querySelector(`.${styles.editor}`) as HTMLDivElement,
    });
  }, []);

  return <div className={styles.editor} />;
};

export default Editor;
