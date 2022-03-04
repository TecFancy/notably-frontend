import React, { useEffect } from "react";
import { EditorState, Facet } from "@codemirror/state";
import { history, historyKeymap } from "@codemirror/history";
import { defaultKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { indentOnInput } from "@codemirror/language";
import { highlightActiveLineGutter } from "@codemirror/gutter";
import { bracketMatching } from "@codemirror/matchbrackets";
import {
  findPrevious,
  highlightSelectionMatches,
  searchKeymap,
} from "@codemirror/search";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { commentKeymap } from "@codemirror/comment";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { lintKeymap } from "@codemirror/lint";
import { Range, RangeSetBuilder } from "@codemirror/rangeset";
import { Line } from "@codemirror/text";
import {
  EditorView,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  keymap,
  ViewPlugin,
  ViewUpdate,
  DecorationSet,
  Decoration,
} from "@codemirror/view";

import styles from "./App.module.scss";

const textStartsWith = [
  {
    startsWith: "# ",
    decoLine: Decoration.line({ class: styles.heading1 }),
    callback: (deco: Range<Decoration>[], decoration: Decoration, line: Line) =>
      deco.push(decoration.range(line.from)),
  },
  {
    startsWith: "## ",
    decoLine: Decoration.line({ class: styles.heading2 }),
    callback: (deco: Range<Decoration>[], decoration: Decoration, line: Line) =>
      deco.push(decoration.range(line.from)),
  },
];

const App: React.FC = () => {
  useEffect(() => {
    const editorState = EditorState.create({
      doc: "# Heading 1.\n# Heading 12.\n## Heading 2.\nhaha\n### Heading 3.\njojo\n### Heading 4.",
      extensions: [
        ViewPlugin.fromClass(
          class {
            decorations: DecorationSet;
            constructor(view: EditorView) {
              this.decorations = this.getDeco(view);
            }
            update(update: ViewUpdate) {
              if (update.docChanged || update.selectionSet) {
                this.decorations = this.getDeco(update.view);
              }
            }
            getDeco(view: EditorView) {
              const deco: Range<Decoration>[] = [];
              for (const { from, to } of view.visibleRanges) {
                for (let pos = from; pos <= to; ) {
                  let line = view.state.doc.lineAt(pos);
                  textStartsWith.forEach((item) => {
                    if (line.text.startsWith(item.startsWith)) {
                      item.callback(deco, item.decoLine, line);
                    }
                  });
                  pos = line.to + 1;
                }
              }
              return Decoration.set(deco);
            }
          },
          {
            decorations: (v) => v.decorations,
          }
        ),
        // zebraStripes(),
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
