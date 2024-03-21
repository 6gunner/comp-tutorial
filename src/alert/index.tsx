import React from "react";
type AlertProps = {
  type: "info" | "success" | "warning" | "danger";
};

export type TypeMap = Record<Required<AlertProps>["type"], string>;

const prefixCls = "easy-alert";

const colors: TypeMap = {
  info: "#5352ED",
  success: "#2ED573",
  warning: "#FFA502",
  danger: "#FF4757",
};

const Alert: React.FC<React.PropsWithChildren<AlertProps>> = (props) => {
  const { type, children, ...resetProps } = props;
  return (
    <div
      className={prefixCls}
      style={{
        background: colors[type],
      }}
      {...resetProps}
    >
      {children}
    </div>
  );
};
export default Alert;
