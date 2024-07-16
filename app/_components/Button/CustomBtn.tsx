"use client";
import Link from "next/link";
import styles from "./CustumBtn.module.css";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  LinkHTMLAttributes,
  ReactElement,
} from "react";

// custom button props
type IBtn = React.DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  word?: string;
  btnColor: "white" | "black";
  icon?: ReactElement;
  href?: string;
  widthSize?: string | "";
  width?: string;
  class?: string;
  paddingVal?: string;
};

/**
 * Renders a custom button component that can navigate to the last or next page with a black or white style,
 * and can have an icon or not.
 *
 * @param {IBtn} props - The props for the custom button component.
 * @param {string} props.word - The text to display on the button.
 * @param {string} props.btnColor - The color of the button, either 'white' or 'black'.
 * @param {ReactElement} props.icon - The icon to display on the button.
 * @param {string} props.href - The URL to navigate to when the button is clicked.
 * @param {string} props.widthSize - The width of the button.
 * @param {string} props.width - The width of the button.
 * @param {string} props.class - The CSS class to apply to the button.
 * @param {string} props.paddingVal - The padding value for the button.
 * @return {JSX.Element} The rendered custom button component.
 */
const CustomBtn = (props: IBtn) => {
  return (
    // custom button to navigate to the last or next page with black or white style and with icon or without it
    <Link
      className={`${
        props.btnColor === "white" ? styles.whiteBtn : styles.blackBtn
      } ${props.class} ${props.width ? props.width : "w-fit"} `}
      {...props}
      href={props.href ? props.href : "#"}
    >
      <div
        className={`${styles.iconAndTxtBtn} ${
          props.paddingVal ? props.paddingVal : `py-[0.5vw] px-[3vw]`
        }`}
      >
        {props.icon ? props.icon : null}
        {props.word ? <span>{props.word}</span> : null}
      </div>
    </Link>
  );
};

export default CustomBtn;
