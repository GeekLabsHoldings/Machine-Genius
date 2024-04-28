import { ReactElement, ReactNode } from "react";

export type personStatus = 'online' | 'offline' | 'away'


// article data properities
export interface IArticle {
    title:string,
    sectionsNo : number,
    sectionData: string[]
}

// preview article component props
export interface IArticleProps {
    height:string,
    beginSelect?:boolean,
    withEdit:boolean,
    yourNewArticle:boolean
}

export interface ICommentData {
    managerStatus: personStatus,
    replyTxt?:string,
    replyDate?:string,
    ownerName?:string,
    ownerStatus?:personStatus,
    title:string
}