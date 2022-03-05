/**
 * @description 在 MarkDown 文本行上添加类名
 */

import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { Range } from "@codemirror/rangeset";
import { syntaxTree } from "@codemirror/language";
import classNames from "classnames";

import styles from "../styles/md.module.scss";

class MarkdownWidget extends WidgetType {
  text: string;
  typeName: string;
  constructor(view: EditorView, text: string, typeName: string) {
    super();
    this.text = text;
    this.typeName = typeName;
  }
  toDOM(view: EditorView): HTMLElement {
    const containerEle = document.createElement("span");
    const headingMarkEle = document.createElement("span");
    const headingTextEle = document.createElement("span");

    containerEle.setAttribute(
      "class",
      classNames(styles.heading, {
        [styles.heading1]: this.typeName === "ATXHeading1",
        [styles.heading2]: this.typeName === "ATXHeading2",
      })
    );
    headingMarkEle.setAttribute(
      "class",
      classNames(styles.headingMark, {
        [styles.heading1Mark]: this.typeName === "ATXHeading1",
        [styles.heading2Mark]: this.typeName === "ATXHeading2",
      })
    );
    headingTextEle.setAttribute(
      "class",
      classNames(styles.headingText, {
        [styles.heading1Text]: this.typeName === "ATXHeading1",
        [styles.heading2Text]: this.typeName === "ATXHeading2",
      })
    );

    switch (this.typeName) {
      case "ATXHeading1":
        headingMarkEle.innerText = this.text.slice(0, 2);
        headingTextEle.innerText = this.text.slice(2);
        break;
      case "ATXHeading2":
        headingMarkEle.innerText = this.text.slice(0, 3);
        headingTextEle.innerText = this.text.slice(3, this.text.length);
        break;
      default:
        break;
    }

    containerEle.appendChild(headingMarkEle);
    containerEle.appendChild(headingTextEle);

    return containerEle;
  }
}

export const addClass2MdLine = () => {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) {
        this.decorations = this.getDeco(view);
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
          syntaxTree(view.state).iterate({
            from,
            to,
            enter: (type, from, to) => {
              switch (type.name) {
                case "ATXHeading1":
                  deco.push(
                    Decoration.replace({
                      widget: new MarkdownWidget(
                        view,
                        view.state.doc.sliceString(from, to),
                        "ATXHeading1"
                      ),
                    }).range(from, to)
                    // Decoration.widget({
                    //   widget: new MarkdownWidget(view, "#", styles.heading1),
                    // }).range(to)
                    // Decoration.line({ class: styles.heading1 }).range(from)
                    // Decoration.mark({
                    //   attributes: { class: styles.heading1 },
                    //   tagName: "SPAN",
                    // }).range(from, to)
                    // Decoration.mark({
                    //   inclusive: true,
                    //   attributes: { class: styles.heading1 },
                    //   tagName: "SPAN",
                    // }).range(from, to)
                  );
                  break;
                case "ATXHeading2":
                  deco.push(
                    Decoration.replace({
                      widget: new MarkdownWidget(
                        view,
                        view.state.doc.sliceString(from, to),
                        "ATXHeading2"
                      ),
                    }).range(from, to)
                    // Decoration.widget({
                    //   widget: new MarkdownWidget(view, "##", styles.heading2),
                    // }).range(to)
                    // Decoration.line({ class: styles.heading2 }).range(from)
                    // Decoration.mark({
                    //   attributes: { class: styles.heading2 },
                    //   tagName: "SPAN",
                    // }).range(from, to)
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
      getDecoSelection(view: EditorView) {
        return Decoration.set([]);
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
};
