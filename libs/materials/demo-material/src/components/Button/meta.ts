import { snippets } from "./snippets";

import type { CMaterialType } from "@chamn/model";

export const ButtonMeta: CMaterialType = {
  componentName: "DesignerButton",
  title: "按钮",
  props: [],
  npm: {
    name: "DesignerButton",
    package: __PACKAGE_NAME__ || "",
    version: __PACKAGE_VERSION__,
    destructuring: true,
    exportName: "DesignerButton",
  },
  snippets: snippets,
};

export default [ButtonMeta];
