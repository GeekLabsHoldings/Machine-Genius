"use client";
import styles from "./CustomCheckBox.module.css";

type IProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  value?: string;
  accentColor?: string;
};

const CustomCheckBox = (props: IProps) => {
  return (
    <input
      className={`${styles.custom_checkbox} `}
      type="checkbox"
      style={{ "--module-color": props.accentColor }}
      {...props}
    />
  );
};

export default CustomCheckBox;
