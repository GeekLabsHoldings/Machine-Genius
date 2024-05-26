"use client";
import React from "react";
import styles from "./TemplateBox.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";

interface IProps {
  title: string;
  children?: React.ReactNode;
}

export default function TemplateBox({ title, children }: IProps) {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div className="space-y-[1vw]">
          <p>{title}</p>
          <p>Interview Questions</p>
        </div>
      </div>
      <div className={styles.body + " space-y-[0.6vw]"}>{children}</div>
      {children && <div className={styles.line}></div>}
      <CustomBtn
        btnColor="black"
        word="View Template"
        width="w-full"
        paddingVal="py-[16px] px-[14px]"
        //   href="/hr/"
      />
    </div>
  );
}
