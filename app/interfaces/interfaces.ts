import { ReactElement } from "react";

export interface IBtn {
    word:string,
    btnColor:'white'|'black'|null,
    icon?: ReactElement,
    href:string
}


export interface IArticle {
    title:string,
    sectionsNo : number,
    sectionData: string[]
}

export interface IArticleProps {
    withSelect:boolean,
    selectedText:string[],
    setSelectedText:(val:string[])=>void
}
