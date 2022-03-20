import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import {
  Decoration,
  DecorationSet,
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { history, historyKeymap } from "@codemirror/history";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";
import { RangeSetBuilder } from "@codemirror/rangeset";
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from "@codemirror/highlight";

import styles from "./index.module.scss";
import { Line } from "@codemirror/text";
import { syntaxTree } from "@codemirror/language";

const mdHighlightStyle = HighlightStyle.define([
  { tag: tags.heading, class: "cm-heading" },
  { tag: tags.heading1, class: "cm-heading-1" },
  { tag: tags.heading2, class: "cm-heading-2" },
  { tag: tags.heading3, class: "cm-heading-3" },
  { tag: tags.heading4, class: "cm-heading-4" },
  { tag: tags.heading5, class: "cm-heading-5" },
  { tag: tags.heading6, class: "cm-heading-6" },
]);

const Editor = () => {
  useEffect(() => {
    const editorState = EditorState.create({
      doc: "# Heading 1\n\n## Heading 2\n",
      extensions: [
        ViewPlugin.fromClass(
          class {
            decorations: DecorationSet;
            constructor(view: EditorView) {
              this.decorations = this.buildDeco(view);
            }
            update(update: ViewUpdate) {
              if (update.docChanged || update.selectionSet) {
                this.decorations = this.buildDeco(update.view);
              }
            }
            buildDeco(view: EditorView) {
              const builder = new RangeSetBuilder<Decoration>();
              view.viewportLines((line) => {
                const lineObj = view.state.doc.lineAt(line.from);
                syntaxTree(view.state).iterate({
                  from: lineObj.from,
                  to: lineObj.to,
                  enter: function (type, from, to) {
                    if (lineObj.from === from && lineObj.to === to) {
                      if (type.name === "ATXHeading1") {
                        console.log("hhh");
                        builder.add(
                          line.from,
                          line.from,
                          Decoration.line({ class: "cm-heading-1" })
                        );
                      }
                      if (type.name === "ATXHeading2") {
                        builder.add(
                          line.from,
                          line.from,
                          Decoration.line({ class: "cm-heading-2" })
                        );
                      }
                    }
                  },
                });
              });
              return builder.finish();
            }
          },
          {
            decorations: (v) => v.decorations,
          }
        ),
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
