import { URLPattern } from "next/server";
import { ReactElement, ReactNode } from "react";

// Define custom type aliases
export type personStatus = 'online' | 'offline' | 'away'
type Percentage = `${number}%`
export type TCompanyEmployees = 'Sherry' | 'Yara' | 'Kamel' | 'Manar'
export type TasksType = 'Assigned' | 'Inprogress' | 'Tasks Done'
export type TBrands = 'PST USA' | 'PST Asia' | 'Investocracy' | 'Street Politics' | 'Canada'
export type TContentType = 'Script' | 'Article'
export type TApproval = 'Pending' | 'Approved' | 'Rejected'
export type TPublish = 'Not Published' | 'Uploading' | 'Published'

// Interface for article data properties
export interface IArticle {
    title:string,
    sectionsNo : number,
    sectionData: string[]
}

// Interface for preview article component props
export interface IArticleProps {
    height:string,
    beginSelect?:boolean,
    withEdit:boolean,
    yourNewArticle:boolean,
    isEditable: boolean,
    finalArticle?: any
}

// Interface for comments data
export interface ICommentData {
    managerStatus: personStatus,
    replyTxt?:string,
    replyDate?:string,
    ownerName?:string,
    ownerStatus?:personStatus,
    title:string
}

// Interface for transcript data
export interface ITranscriptData{
    text:string,
    minutes : string
}

// Interface for user's article data
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

// Interface for tasks data
export interface ITasks{
    taskType: TasksType,
    tasks:TBrands[]
}

// Interface for assigned videos
export interface IAssignedVideos {
    id:number,
    title:string,
    date: string,
    assignedTo : TCompanyEmployees,
    videoStatus : 'Convert Audio' | 'Continue'
}


// Interface for video database
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
// Interface for Reddit posts data
export interface IRedditData {
    subReddit:string,
    link: string,
    subscribers:number,
    niche:string,
    brand:TBrands,
    engagement:Percentage
}

// Interface for social media accounts data
export interface IAccounts {
    id:number,
    account_name:string,
    account_type: 'facebook'|'telegram'|'reddit',
    status:'Running'|'Finished'|'Paused',
    comments: number,
    user_name:string ,
    link:string ,
    brand:TBrands,
    niche:string,
    Campaign_type:'Auto Comment' | 'Must Approve',
    followers:number,
    engagement:Percentage
}

// Interface for campaigns data
export interface ICampaigns{
    id:number,
    content:string,
    link:string,
    date:string,
    shareBtn:string
}

