import { ReactElement } from "react";

export interface IBtn {
    word:string,
    btnColor:'white'|'black'|null,
    icon?: ReactElement
}

export interface IArticle {
    title:string,
    sectionsNo : number,
    sectionData: string[]
}

export interface IArticleProps {
    withSelect:boolean
}