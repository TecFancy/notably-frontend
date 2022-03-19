import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { history, historyKeymap } from "@codemirror/history";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from "@codemirror/highlight";

import styles from "./index.module.scss";

const mdHighlightStyle = HighlightStyle.define([
  { tag: tags.heading, class: "heading" },
  { tag: tags.heading1, class: "heading-1" },
  { tag: tags.heading2, class: "heading-2" },
  { tag: tags.heading3, class: "heading-3" },
  { tag: tags.heading4, class: "heading-4" },
  { tag: tags.heading5, class: "heading-5" },
  { tag: tags.heading6, class: "heading-6" },
]);

const Editor = () => {
  useEffect(() => {
    const editorState = EditorState.create({
      doc: "# Heading 1\n\n## Heading 2\n",
      extensions: [
        mdHighlightStyle,
        defaultHighlightStyle.fallback,
        defaultHighlightStyle.extension,
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
