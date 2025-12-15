import { Button } from "antd";

import type { ButtonProps } from "antd";

import "./index.less";

export type DesignerButtonType = "primary" | "default";

export interface IDesignerButtonProps extends ButtonProps {
  designerType: DesignerButtonType;
}

export function DesignerButton(props: IDesignerButtonProps) {
  const { designerType, ...rest } = props;

  return (
    <div className={`demo-material-root metarial-button ${designerType}`}>
      <Button {...rest} />
    </div>
  );
}
