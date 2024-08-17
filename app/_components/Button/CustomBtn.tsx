"use client";
import React, { memo } from "react";
import styles from "./CustomBtn.module.css";
import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactElement,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Custom button props
type IBtn = {
  word?: string;
  btnColor: "white" | "black";
  icon?: ReactElement;
  href?: string;
  widthSize?: string | "";
  width?: string;
  class?: string;
  paddingVal?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
} & (
  | React.DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  | React.DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
);

const CustomBtn = memo((props: IBtn) => {
  const router = useRouter();
  const {
    href,
    btnColor,
    class: className,
    width,
    icon,
    word,
    paddingVal,
    onClick,
    ...restProps
  } = props;

  const buttonContent = (
    <div
      className={`${styles.iconAndTxtBtn} ${
        paddingVal ? paddingVal : `py-[0.5vw] px-[3vw]`
      }`}
    >
      {icon ? icon : null}
      {word ? <span>{word}</span> : null}
    </div>
  );

  const buttonClass = `${
    btnColor === "white" ? styles.whiteBtn : styles.blackBtn
  } ${className} ${width ? width : "w-fit"}`;

  if (href && !onClick) {
    // Anchor attributes only
    const anchorProps = restProps as React.DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >;

    return (
      <Link href={href} className={buttonClass} {...anchorProps} replace>
        {buttonContent}
      </Link>
    );
  } else {
    // Button attributes only
    const buttonProps = restProps as React.DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >;

    return (
      <button
        className={buttonClass}
        {...buttonProps}
        onClick={(e) => {
          if (href) {
            router.replace(href);
          } else if (onClick) {
            onClick(e);
          }
        }}
      >
        {buttonContent}
      </button>
    );
  }
});

export default CustomBtn;
