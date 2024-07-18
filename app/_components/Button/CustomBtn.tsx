"use client";
import Link from "next/link";
import styles from "./CustumBtn.module.css";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  LinkHTMLAttributes,
  ReactElement,
} from "react";
import { useRouter } from "next/navigation";

// custom button props
type IBtn = React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  word?: string;
  btnColor: "white" | "black";
  icon?: ReactElement;
  href?: string;
  widthSize?: string | "";
  width?: string;
  class?: string;
  paddingVal?: string;
  onClick?: () => void;
};

const CustomBtn = (props: IBtn) => {
  const router = useRouter();

  return (
    // custom button to navigate to the last or next page with black or white style and with icon or without it
    <button
      className={`${
        props.btnColor === "white" ? styles.whiteBtn : styles.blackBtn
      } ${props.class} ${props.width ? props.width : "w-fit"} `}
      {...props}
      onClick={() => {
        if (props.href) {
          router.replace(props.href);
        } else if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <div
        className={`${styles.iconAndTxtBtn} ${
          props.paddingVal ? props.paddingVal : `py-[0.5vw] px-[3vw]`
        }`}
      >
        {props.icon ? props.icon : null}
        {props.word ? <span>{props.word}</span> : null}
      </div>
    </button>
  );
};

export default CustomBtn;
