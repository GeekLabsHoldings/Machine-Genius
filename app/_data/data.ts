import {
  IArticle,
  IAssignedVideos,
  ICommentData,
  IRedditData,
  ITasks,
  ITranscriptData,
  IVideoDatabase,
  IyourArticle,
  TApproval,
  TBrands,
  TContentType,
} from "../_interfaces/interfaces";

// article data returned from genuis search
export const ArticlePreviewData: IArticle[] = [
  {
    title: "Canada Loves People",
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
  "Canada Loves People ",
  "Canada Loves People ",
  "Canada Loves People ",
  "Canada Loves People ",
  "Canada Loves People ",
  "Canada Loves People ",
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
    contentType:'Script',
    views:'300',
    approvals:'Pending',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:2,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    contentType:'Script',
    views:'12.1K',
    approvals:'Pending',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:3,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    contentType:'Article',
    views:'300',
    approvals:'Rejected',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:4,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Article',
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:5,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    contentType:'Script',
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:6,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    contentType:'Article',
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:7,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Script',
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:8,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    contentType:'Script',
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:9,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    contentType:'Script',
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:10,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Article',
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:11,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    contentType:'Article',
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:12,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Article',
    views:'300',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:13,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    contentType:'Script',
    views:'12.1K',
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
]

export const AssignedVideos:IAssignedVideos[] = [
  {
    id:1,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Sherry',
    videoStatus:'Convert Audio'

  },
  {
    id:2,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Kamel',
    videoStatus:'Convert Audio'

  },
  {
    id:3,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Yara',
    videoStatus:'Convert Audio'

  },
  {
    id:4,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Sherry',
    videoStatus:'Continue'

  },
  {
    id:5,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Yara',
    videoStatus:'Continue'

  },
  {
    id:6,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Manar',
    videoStatus:'Continue'

  },
  {
    id:7,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Sherry',
    videoStatus:'Convert Audio'

  },
  {
    id:8,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Yara',
    videoStatus:'Convert Audio'

  },
  {
    id:9,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Sherry',
    videoStatus:'Continue'

  },
  {
    id:10,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Manar',
    videoStatus:'Continue'

  },
  {
    id:11,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Sherry',
    videoStatus:'Convert Audio'

  },
  {
    id:12,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Kamel',
    videoStatus:'Convert Audio'

  },
  {
    id:13,
    title:'Pacific Allies ABANDON USA For China!',
    date:'12 March  2024',
    assignedTo: 'Manar',
    videoStatus:'Convert Audio'

  }
]

export const VideosTemplates = [
  {
  brand:'PST Finance',
  videoTypes:['Educational','Educational']
},
{
  brand:'PST Markets',
  videoTypes:['Educational','Educational','Educational','Educational']
},
{
  brand:'PST Mega',
  videoTypes:['Educational','Educational','Educational']
},
{
  brand:'PST Originals',
  videoTypes:['Educational','Educational','Educational']
},
{
  brand:'PST Finance',
  videoTypes:['Educational','Educational']
},
{
  brand:'PST Originals',
  videoTypes:['Educational','Educational','Educational']
},

]
export const VideosDatabase:IVideoDatabase[] =[
  {
    id:1,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:'300',
    approvals:'Pending',
    publish:'Not Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:2,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    views:'12.1K',
    approvals:'Pending',
    publish:'Uploading',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:3,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    views:'300',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:4,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:'300',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:5,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    views:'12.1K',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:6,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:'300',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:7,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    views:'12.1K',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:8,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    views:'300',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:9,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    views:'12.1K',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:10,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:'300',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:11,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    views:'12.1K',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:12,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:'300',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:13,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    views:'12.1K',
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
]

export const RedditPosts : IRedditData[] =[
  {
    subReddit:'Stocks Today',
    link: new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'300K',
    niche:'Politics',
    brand:'PST USA',
    engagement:'26%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'23K',
    niche:'Politics',
    brand:'PST Asia',
    engagement:'80%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'2K',
    niche:'Politics',
    brand:'Investocracy',
    engagement:'25%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'50k',
    niche:'Politics',
    brand:'PST USA',
    engagement:'90%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'300K',
    niche:'Politics',
    brand:'Canada',
    engagement:'66%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'50k',
    niche:'Politics',
    brand:'Canada',
    engagement:'15%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'2K',
    niche:'Politics',
    brand:'PST USA',
    engagement:'26%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'50k',
    niche:'Politics',
    brand:'Investocracy',
    engagement:'80%'
  },

  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'300K',
    niche:'Politics',
    brand:'Canada',
    engagement:'25%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'50k',
    niche:'Politics',
    brand:'Investocracy',
    engagement:'90%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'2K',
    niche:'Politics',
    brand:'Street Politics',
    engagement:'66%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:'50K',
    niche:'Politics',
    brand:'Canada',
    engagement:'15%'
  },
]
export const Platforms =[
  'Reddit','Telegram','Facebook'
]
export const Brands:TBrands[] =['PST USA' , 'PST Asia' , 'Investocracy' , 'Street Politics' , 'Canada']
export const ContentType:TContentType[] =["Script" , "Article"]
export const ApprovalStatus:TApproval[] = ['Approved','Pending','Rejected']