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
import { syntaxTree } from "@codemirror/language";

const addHeading12md = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = Decoration.set([]);
      for (const range of view.visibleRanges) {
        syntaxTree(view.state).iterate({
          from: range.from,
          to: range.to,
          enter: function (type, from, to) {
            console.log(type, from, to);
          },
        });
      }
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
