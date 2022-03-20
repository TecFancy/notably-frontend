import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { syntaxTree } from "@codemirror/language";
import { defaultKeymap } from "@codemirror/commands";
import { RangeSetBuilder } from "@codemirror/rangeset";
import { history, historyKeymap } from "@codemirror/history";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from "@codemirror/highlight";
import {
  Decoration,
  DecorationSet,
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

import styles from "./index.module.scss";

const mdHighlightStyle = HighlightStyle.define([
  { tag: tags.heading, class: "cm-heading" },
  { tag: tags.heading1, class: "cm-heading-1" },
  { tag: tags.heading2, class: "cm-heading-2" },
  { tag: tags.heading3, class: "cm-heading-3" },
  { tag: tags.heading4, class: "cm-heading-4" },
  { tag: tags.heading5, class: "cm-heading-5" },
  { tag: tags.heading6, class: "cm-heading-6" },
  { tag: tags.list, class: "cm-list" },
]);

const classNamesMap: { [propName: string]: string } = {
  ATXHeading1: "cm-heading-1",
  ATXHeading2: "cm-heading-2",
  ATXHeading3: "cm-heading-3",
  ATXHeading4: "cm-heading-4",
  ATXHeading5: "cm-heading-5",
  ATXHeading6: "cm-heading-6",
  ListItem: "cm-listItem",
};

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
                      if (classNamesMap[type.name]) {
                        builder.add(
                          line.from,
                          line.from,
                          Decoration.line({ class: classNamesMap[type.name] })
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
