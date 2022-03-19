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
import { syntaxTree } from "@codemirror/language";
import { defaultKeymap } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";

import styles from "./index.module.scss";

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
        defaultHighlightStyle.fallback,
        history(),
        markdown(),
        keymap.of([...defaultKeymap, ...historyKeymap, ...markdownKeymap]),
      ],
    });
    const editor = new EditorView({
      state: editorState,
      parent: document.querySelector("#editor") as HTMLDivElement,
    });
    return () => editor.destroy();
  }, []);

  return <div id="editor" className={styles.editor} />;
};

export default Editor;
