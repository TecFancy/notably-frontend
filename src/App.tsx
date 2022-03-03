import React, { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { history, historyKeymap } from "@codemirror/history";
import { defaultKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { indentOnInput } from "@codemirror/language";
import { highlightActiveLineGutter } from "@codemirror/gutter";
import { bracketMatching } from "@codemirror/matchbrackets";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { commentKeymap } from "@codemirror/comment";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { lintKeymap } from "@codemirror/lint";
import {
  EditorView,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  keymap,
} from "@codemirror/view";

import styles from "./App.module.scss";

const App: React.FC = () => {
  useEffect(() => {
    const editorState = EditorState.create({
      doc: "# Heading 1.",
      extensions: [
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        defaultHighlightStyle.fallback,
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        markdown(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...commentKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
        // keymap.of(defaultKeymap),
      ],
    });
    const view = new EditorView({
      state: editorState,
      parent: document.querySelector("#editor") as HTMLElement,
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
          <div id="editor" className={styles.editorInner} />
        </div>
      </div>
    </div>
  );
};

export default App;
