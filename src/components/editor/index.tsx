import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";

import styles from "./index.module.scss";

const addHeading12md = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = Decoration.set([]);
      console.log("view", view.state.changes());
    }
    update(update: ViewUpdate) {
      if (update.docChanged) {
        // TODO
      }
    }
  }
);

const Editor = () => {
  useEffect(() => {
    const editorState = EditorState.create({
      doc: "# Heading 1\n\n## Heading 2\n",
      extensions: [
        addHeading12md,
        history(),
        markdown(),
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
