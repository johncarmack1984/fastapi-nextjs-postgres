import remarkEmoji from "remark-emoji";
import remarkFlexibleCodeTitles from "remark-flexible-code-titles";
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from "remark-flexible-containers";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkFlexibleParagraphs from "remark-flexible-paragraphs";
import remarkFlexibleToc, {
  type FlexibleTocOptions,
  type TocItem,
} from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import { type PluggableList } from "unified";

import { titleCase } from "@/lib/strings";

const baseRemarkPlugins: PluggableList = [
  remarkGfm,
  remarkFlexibleMarkers, // order of plugins matters
  remarkEmoji,
  remarkFlexibleParagraphs,
  [
    remarkFlexibleContainers,
    {
      title: () => null,
      containerTagName: "admonition",
      containerProperties: (type, title) => {
        return {
          ["data-type"]: type?.toLowerCase(),
          ["data-title"]: titleCase(title) ?? titleCase(type),
        };
      },
    } as FlexibleContainerOptions,
  ],
  remarkFlexibleCodeTitles,
];

export const remarkPlugins: PluggableList = [
  ...baseRemarkPlugins,
  remarkFlexibleToc,
];

// experimental, used in only "Test Basic" pages to get the Table of Contents differently
export function getRemarkPlugins(toc: TocItem[]): PluggableList {
  return [
    ...baseRemarkPlugins,
    [
      remarkFlexibleToc,
      {
        tocRef: toc, // the plugin "remark-flexible-toc" mutates the "toc" via "tocRef"
      } as FlexibleTocOptions,
    ],
  ];
}
