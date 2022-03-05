/**
 * @description 在 MarkDown 文本行上添加类名
 */

import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { Range } from "@codemirror/rangeset";
import { syntaxTree } from "@codemirror/language";

import styles from "../styles/md.module.scss";

export const addClass2MdLine = () => {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) {
        this.decorations = this.getDeco(view);
      }
      update(update: ViewUpdate) {
        if (update.docChanged || update.selectionSet) {
          this.decorations = this.getDeco(update.view);
          console.log("update");
        }
      }
      getDeco(view: EditorView) {
        const deco: Range<Decoration>[] = [];
        for (const { from, to } of view.visibleRanges) {
          syntaxTree(view.state).iterate({
            from,
            to,
            enter: (type, from, to) => {
              switch (type.name) {
                case "ATXHeading1":
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
    {
      decorations: (v) => v.decorations,
    }
  );
};
