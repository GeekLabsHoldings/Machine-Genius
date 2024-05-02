import {
  IArticle,
  ICommentData,
  ITasks,
  ITranscriptData,
  IyourArticle,
  TApproval,
  TBrands,
  TContentType,
} from "../_interfaces/interfaces";

// article data returned from genuis search
export const ArticlePreviewData: IArticle[] = [
  {
    title: "Canada Hates People",
    sectionsNo: 4,
    sectionData: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
      "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
    ],
  },
];
// many article returned from genuis search to render in select and allow user to select from them
export const SelectArticleData: string[] = [
  "Canada Hates People ",
  "Canada Hates People ",
  "Canada Hates People ",
  "Canada Hates People ",
  "Canada Hates People ",
  "Canada Hates People ",
];
export const TranscriptData: ITranscriptData[] = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "0:00 - 0:40",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "3:00 - 4:40",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "0:00 - 0:40",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "0:00 - 0:40",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "0:00 - 0:40",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "0:00 - 0:40",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    minutes: "0:00 - 0:40",
  },
];
export const CommentsData: ICommentData[] = [
  {
    managerStatus: "online",
    replyTxt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun",
    replyDate: "April 16th 2024",
    ownerName: "John",
    ownerStatus: "online",
    title: "Emily",
  },
  {
    managerStatus: "away",
    title: "Manar",
  },
  {
    managerStatus: "offline",
    title: "Ash",
  },
];
export const Positions = ["Intern","Full-Time","Senior"]

export const ArticleNames: string[] = [
  "Pacific Allies ABANDON USA For China!",
  "Pacific Allies ABANDON USA For China!",
  "Pacific Allies ABANDON USA For China!",
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!',
  'Pacific Allies ABANDON USA For China!'
];

export const TasksInDashboard:ITasks[] = [
  {
    taskType:'Assigned',
    tasks:['Canada','Street Politics','PST USA']
  },
  {
    taskType:'Inprogress',
    tasks:['Investocracy']
  },
  {
    taskType:'Tasks Done',
    tasks:['PST Asia']
  }
]

export const ContentTypeFilter=['All','Script']

export const YourArticles:IyourArticle[] =[
  {
    id:1,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Pending',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:2,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    contentType:['Script','Article'],
    views:'12.1K',
    approvals:'Pending',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:3,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Rejected',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:4,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:5,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    contentType:['Script','Article'],
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:6,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:7,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:['Script','Article'],
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:8,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:9,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    contentType:['Script','Article'],
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:10,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:11,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    contentType:['Script','Article'],
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:12,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:['Script','Article'],
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:13,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    contentType:['Script','Article'],
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
]
export const Brands:TBrands[] =['PST USA' , 'PST Asia' , 'Investocracy' , 'Street Politics' , 'Canada']
export const ContentType:TContentType[] =["Script" , "Article"]
export const ApprovalStatus:TApproval[] = ['Approved','Pending','Rejected']