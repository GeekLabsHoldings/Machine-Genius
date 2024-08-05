import {
  IAccounts,
  IArticle,
  IAssignedVideos,
  ICampaigns,
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
// Data for transcript of video content
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
// Data for comments
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
// Array of positions
export const Positions = ["Intern","Full-Time","Senior"]

// Array of article names
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

// Data for tasks in the dashboard
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

// Array for filtering content type
export const ContentTypeFilter=['All','Script']

// Data for your articles
export const YourArticles:IyourArticle[] =[
  {
    id:1,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Script',
    views:300,
    approvals:'Pending',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:2,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    contentType:'Script',
    views:12100,
    approvals:'Pending',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:3,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    contentType:'Article',
    views:300,
    approvals:'Rejected',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:4,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Article',
    views:300,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:5,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    contentType:'Script',
    views:12100,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:6,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    contentType:'Article',
    views:300,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:7,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Script',
    views:12100,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:8,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    contentType:'Script',
    views:300,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:9,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    contentType:'Script',
    views:12100,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:10,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Article',
    views:300,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:11,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    contentType:'Article',
    views:12100,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:12,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    contentType:'Article',
    views:300,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
  {
    id:13,
    articleName:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    contentType:'Script',
    views:12100,
    approvals:'Approved',
    date:'12 March  2024',
    editBtn:'Edit'
  },
]

// Data for assigned videos
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

// Data for video templates
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

// Data for videos in the database
export const VideosDatabase:IVideoDatabase[] =[
  {
    id:1,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:300,
    approvals:'Pending',
    publish:'Not Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:2,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    views:12100,
    approvals:'Pending',
    publish:'Uploading',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:3,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    views:300,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:4,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:300,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:5,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    views:12100,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:6,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:300,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:7,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST Asia',
    views:12100,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:8,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    views:300,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:9,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Investocracy',
    views:12100,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:10,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:300,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:11,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Canada',
    views:12100,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:12,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'PST USA',
    views:300,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
  {
    id:13,
    title:'Pacific Allies ABANDON USA For China!',
    brand:'Street Politics',
    views:12100,
    approvals:'Approved',
    publish:'Published',
    date:'12 March  2024',
    edit:'Edit'
  
  },
]

// Data for posts
export const Posts : IRedditData[] =[
  {
    subReddit:'Stocks Today',
    link: new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:300000,
    niche:'Politics',
    brand:'PST USA',
    engagement:'26%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:23000,
    niche:'Politics',
    brand:'PST Asia',
    engagement:'80%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:2000,
    niche:'Politics',
    brand:'Investocracy',
    engagement:'25%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:50000,
    niche:'Politics',
    brand:'PST USA',
    engagement:'90%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:300000,
    niche:'Politics',
    brand:'Canada',
    engagement:'66%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:50000,
    niche:'Politics',
    brand:'Canada',
    engagement:'15%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:2000,
    niche:'Politics',
    brand:'PST USA',
    engagement:'26%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:50000,
    niche:'Politics',
    brand:'Investocracy',
    engagement:'80%'
  },

  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:300000,
    niche:'Politics',
    brand:'Canada',
    engagement:'25%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:50000,
    niche:'Politics',
    brand:'Investocracy',
    engagement:'90%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:2000,
    niche:'Politics',
    brand:'Street Politics',
    engagement:'66%'
  },
  {
    subReddit:'Stocks Today',
    link:new URL("https://www.reddit.com/?rdt=45713").toString(),
    subscribers:50000,
    niche:'Politics',
    brand:'Canada',
    engagement:'15%'
  },
]

// Array of platforms
export const Platforms =[
  'Reddit','Telegram','Facebook'
]

// Data for accounts
export const AccountsData:IAccounts[] = [
  {
    id:1,
    account_name:'John Doe',
    account_type: 'reddit',
    user_name:'@Johndoe' ,
    status:'Running',
    comments: 2,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'PST USA',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:300000,
    engagement:'26%'
  },
  {
    id:2,
    account_name:'John Doe',
    account_type: 'telegram',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'PST Asia',
    niche:'Politics',
    Campaign_type:'Must Approve' ,
    followers:23000,
    engagement:'80%',
    status:'Paused',
    comments: 2,
  },
  {
    id:3,
    account_name:'John Doe',
    account_type: 'facebook',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Investocracy',
    niche:'Politics',
    Campaign_type:'Must Approve' ,
    followers:2000,
    engagement:'25%',
    status:'Finished',
    comments: 2,
  },
  {
    id:4,
    account_name:'John Doe',
    account_type: 'reddit',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'PST USA',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:50000,
    engagement:'90%',
    status:'Running',
    comments: 2,
  },
  {
    id:5,
    account_name:'John Doe',
    account_type: 'telegram',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Canada',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:300000,
    engagement:'66%',
    status:'Finished',
    comments: 2,
  },
  {
    id:6,
    account_name:'John Doe',
    account_type: 'facebook',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Canada',
    niche:'Politics',
    Campaign_type:'Must Approve' ,
    followers:50000,
    engagement:'15%',
    status:'Finished',
    comments: 2,
  },
  {
    id:7,
    account_name:'John Doe',
    account_type: 'telegram',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'PST USA',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:2000,
    engagement:'26%',
    status:'Finished',
    comments: 2,
  },
  {
    id:8,
    account_name:'John Doe',
    account_type: 'facebook',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Investocracy',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:50000,
    engagement:'80%',
    status:'Finished',
    comments: 2,
  },
  {
    id:9,
    account_name:'John Doe',
    account_type: 'reddit',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Canada',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:300000,
    engagement:'25%',
    status:'Finished',
    comments: 2,
  },
  {
    id:10,
    account_name:'John Doe',
    account_type: 'reddit',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Investocracy',
    niche:'Politics',
    Campaign_type:'Must Approve' ,
    followers:50000,
    engagement:'90%',
    status:'Finished',
    comments: 2,
  },
  {
    id:11,
    account_name:'John Doe',
    account_type: 'telegram',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Street Politics',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:2000,
    engagement:'66%',
    status:'Finished',
    comments: 2,
  },
  {
    id:12,
    account_name:'John Doe',
    account_type: 'facebook',
    user_name:'@Johndoe' ,
    link:'https://www.reddit.com/?rdt=45713' ,
    brand:'Canada',
    niche:'Politics',
    Campaign_type:'Auto Comment' ,
    followers:50000,
    engagement:'15%',
    status:'Finished',
    comments: 2,
  }
]

// Data for campaigns
export const Campaigns:ICampaigns[] = [
{
  id:1,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:2,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:3,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:4,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:5,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:6,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:7,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:8,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:9,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:10,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:11,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:12,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
{
  id:13,
  content:'Pacific Allies ABANDON USA For China!',
  link:new URL("https://www.reddit.com/?rdt=45713").toString(),
  date:'12 March  2024',
  shareBtn:'Share'
},
]
// Array of brands
export const Brands:TBrands[] =['PST USA' , 'PST Asia' , 'Investocracy' , 'Street Politics' , 'Canada']
// Array of content types
export const ContentType:TContentType[] =["Script" , "Article"]
// Array of approval statuses
export const ApprovalStatus:TApproval[] = ['Approved','Pending','Rejected']