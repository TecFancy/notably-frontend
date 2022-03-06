/**
 * @description Markdown 文本当千行
 */

import { syntaxTree } from "@codemirror/language";
import {
  BlockInfo,
  Decoration,
  DecorationSet,
  EditorView,
  Range,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

import styles from "../styles/md.module.scss";

const heading1Deco = /*@__PURE__*/ Decoration.line({ class: styles.heading1 });

export const activeMDLine = () => {
  return ViewPlugin.fromClass(
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
        for (const range of view.visibleRanges) {
          const { from, to } = range;
          syntaxTree(view.state).iterate({
            from,
            to,
            enter: (type, from, to) => {
              switch (type.name) {
                case "ATXHeading1":
                  console.log(view.state.doc);

                  deco.push(
                    Decoration.line({ class: styles.heading1 }).range(from)
                  );
                  break;
                case "ATXHeading2":
                  deco.push(
                    Decoration.line({ class: styles.heading2 }).range(from)
                  );
                  break;
                default:
                  break;
              }
            },
          });
        }
        return Decoration.set(deco);
      }
    },
    { decorations: (v) => v.decorations }
  );
};
