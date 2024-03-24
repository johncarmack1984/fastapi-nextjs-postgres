import recmaMdxChangeProps from "recma-mdx-change-props";
import recmaMdxEscapeMissingComponents from "recma-mdx-escape-missing-components";
import { type PluggableList } from "unified";

export const recmaPlugins: PluggableList = [
  [
    recmaMdxEscapeMissingComponents,
    ["Bar", "Toc", "ComponentFromOuterProvider"],
  ],
  recmaMdxChangeProps,
];
