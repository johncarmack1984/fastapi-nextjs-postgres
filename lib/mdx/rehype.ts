import { nodeTypes } from "@mdx-js/mdx";
import { Element, Properties } from "hast";
import { Code } from "mdast";
import { State } from "mdast-util-to-hast";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { type PluggableList } from "unified";

/**
 * Turn an mdast `code` node into hast.
 *
 * by default, the language is not specified in `<pre>`,
 * so this handler adds the language information into the parent `<pre>`.
 * @see https://github.com/syntax-tree/mdast-util-to-hast/blob/master/lib/handlers/code.js
 *
 * @param {State} state
 *   Info passed around.
 * @param {Code} node
 *   mdast node.
 * @returns {Element}
 *   hast node.
 */
export function code(state: State, node: Code): Element {
  const value = node.value ? node.value + "\n" : "";
  const properties: Properties = {};

  if (node.lang) {
    properties.className = ["language-" + node.lang];
  }

  // Create `<code>`.
  let result: Element = {
    type: "element",
    tagName: "code",
    properties,
    children: [{ type: "text", value }],
  };

  if (node.meta) {
    result.data = { meta: node.meta };
  }

  state.patch(node, result);
  result = state.applyData(node, result);

  // Create `<pre>` with the same language.
  result = { type: "element", tagName: "pre", properties, children: [result] };
  state.patch(node, result);
  return result;
}

export const rehypePlugins: PluggableList = [
  [rehypeRaw, { passThrough: nodeTypes }], // to allow HTML elements in "md" format, "passThrough" is for "mdx" works as well
  rehypeHighlight,
  rehypeSlug,
];
