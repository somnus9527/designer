import type { SnippetsType } from "@chamn/model";

export const snippets: SnippetsType[] = [
  {
    title: "基础按钮",
    snapshot:
      "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png",
    category: "基础控件",
    description:
      "我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件,我是 antd 的 Button 组件",
    schema: {
      props: {
        type: "primary",
      },
    },
  },
  {
    title: "业务按钮",
    snapshot:
      "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png",
    category: "基础控件",
    schema: {
      props: {
        type: "default",
      },
    },
  },
];
