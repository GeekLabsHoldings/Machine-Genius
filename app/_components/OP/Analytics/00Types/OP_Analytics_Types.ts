/*
social-media/settings/get-groups:
- subscribers.
- followers.
- engagement.
*/
export interface IBrand {
  _id: string;
  brand_name: string;
  description: string;
  aquisition_date: string;
  niche: string;
  __v: number;
}

export interface IGroup {
  _id: string;
  group_name: string;
  link: string;
  group_id: string;
  subscribers: number;
  niche?: string;
  platform: "TELEGRAM" | "FACEBOOK" | "REDDIT" | "TWITTER";
  brand: string;
  engagement: number;
  __v: number;
  personal: boolean;
}

export interface IBrandWithGroups {
  brand: IBrand;
  groups: IGroup[];
}
// =================================================================================
/*
social-media/settings/subscribers:
- total subscribers.
*/
export interface IBrandPlatformSubscribers {
  brand: string;
  platforms: {
    [key in 'TWITTER' | 'FACEBOOK' | 'LINKEDIN' | 'REDDIT' | 'TELEGRAM' | 'YOUTUBE']: {
      totalSubscribers: number;
    };
  };
}
// =================================================================================
/*
ceo/analytics/percentage:
- Followers Overview.
  - followers.
  - percentage.
*/
export interface IFollowersOverview {
  brand: string;
  followers: number;
  percentages: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}
// =================================================================================
/*
ceo/analytics/subs-gains:
- subscribers gains.
*/
export interface ISubscriberGains {
  daily: {
    gain: number;
  };
  weekly: {
    gain: number;
  };
  monthly: {
    gain: number;
  };
}
// =================================================================================
/*
ceo/analytics/post-count:
- posts count chart.
*/
export interface IPostsCountChart {
  date: number;
  data: number;
}
// =================================================================================
/*
ceo/analytics/comments-count:
- comments count chart.
*/
export interface ICommentsCountChart {
  day: number;
  data: number;
}
// =================================================================================
/*
ceo/analytics/group-insights:
- group insights chart.
*/
export interface IGroupInsightsChart {
  date: number;
  result: number;
}
// =================================================================================
/*
ceo/analytics/post-insights:
- post insights:
    - like count.
    - comments count.
    - retweet count.
*/
export interface IPostInsights {
  date: string;
  data: {
    like_count: number;
    num_comments: number;
    retweet_count: number;
  };
}
// =================================================================================
/*
ceo/analytics/kpi:
- KPIs.
- Achieved KPIs.
*/

export interface PlatformKPI {
  _id: string;
  brand: string;
  platform: string;
  timeStamp: number;
  postsPerDay: number;
  postsPerWeek: number;
  postsPerMonth: number;
  year: number;
  month: number;
}

export interface AchievedPlatformKPI {
  platform: string;
  Day: number;
  Week: number;
  Month: number;
}

export interface DateBrand {
  year: number;
  month: number;
  brand: string;
}

export interface IKPI {
  _id: DateBrand;
  platforms: PlatformKPI[];
}

export interface IAchievedKPI {
  date: DateBrand;
  platforms: AchievedPlatformKPI[];
}

export interface IKPIData {
  kpis: IKPI[];
  achievedKPIs: IAchievedKPI[];
}
