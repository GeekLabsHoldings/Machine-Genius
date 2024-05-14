import { URLPattern } from "next/server";
import { ReactElement, ReactNode } from "react";

export type personStatus = 'online' | 'offline' | 'away'
type Percentage = `${number}%`
export type TCompanyEmployees = 'Sherry' | 'Yara' | 'Kamel' | 'Manar'
export type TasksType = 'Assigned' | 'Inprogress' | 'Tasks Done'
export type TBrands = 'PST USA' | 'PST Asia' | 'Investocracy' | 'Street Politics' | 'Canada'
export type TContentType = 'Script' | 'Article'
export type TApproval = 'Pending' | 'Approved' | 'Rejected'
export type TPublish = 'Not Published' | 'Uploading' | 'Published'

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

export interface ITranscriptData{
    text:string,
    minutes : string
}

export interface IyourArticle{
    id:number,
    articleName:string,
    brand: TBrands,
    contentType: TContentType,
    views:number,
    approvals: TApproval,
    date:string,
    editBtn: string
}

export interface ITasks{
    taskType: TasksType,
    tasks:TBrands[]
}

export interface IAssignedVideos {
    id:number,
    title:string,
    date: string,
    assignedTo : TCompanyEmployees,
    videoStatus : 'Convert Audio' | 'Continue'
}
export interface IVideoDatabase{
    id:number,
    title:string,
    brand:TBrands,
    views:number,
    approvals:TApproval,
    publish: TPublish,
    date:string,
    edit:string
}
export interface IRedditData {
    subReddit:string,
    link: string,
    subscribers:number,
    niche:string,
    brand:TBrands,
    engagement:Percentage
}

export interface IAccounts {
    id:number,
    account_name:string,
    account_type: 'facebook'|'telegram'|'reddit',
    user_name:string ,
    link:string ,
    followers:number,
    engagement:Percentage
}


