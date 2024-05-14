'use client'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './ShareCampaign.module.css'
import { useState } from 'react'
import Link from 'next/link'
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'


const reGenerateIcon = <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M0.754732 6.49635C0.310457 6.55953 0.00154495 6.97089 0.0646763 7.41516C0.257889 8.77361 0.876039 10.0362 1.83056 11.0219C2.78517 12.0075 4.02716 12.6659 5.37876 12.9026C6.73034 13.1392 8.12216 12.9421 9.35487 12.3394C9.64191 12.1991 9.91688 12.0385 10.178 11.8593C10.622 11.5546 11.2322 11.5579 11.613 11.9387C12.1248 12.4506 13 12.088 13 11.3642V9.12498C13 8.57269 12.5523 8.12498 12 8.12498H9.76078C9.03693 8.12498 8.67441 9.00013 9.18626 9.51201C9.50975 9.83548 9.49955 10.3701 9.11337 10.6153C8.96152 10.7117 8.80392 10.8 8.64114 10.8796C7.71661 11.3316 6.67275 11.4794 5.65905 11.3019C4.64539 11.1244 3.71386 10.6307 2.99796 9.89137C2.28199 9.15207 1.81838 8.20527 1.67351 7.18636C1.61029 6.7421 1.19893 6.43317 0.754732 6.49635ZM3.64512 0.660543C3.35608 0.801857 3.07927 0.963766 2.81654 1.14447C2.37444 1.44855 1.76644 1.44537 1.38702 1.06594C0.875144 0.554093 0 0.916605 0 1.64047V3.875C0 4.42729 0.447716 4.875 1 4.875H3.23456C3.95842 4.875 4.32096 3.99983 3.80908 3.48799C3.48674 3.16564 3.49674 2.63303 3.88124 2.38813C4.03473 2.29037 4.19413 2.20093 4.35882 2.1204C5.2834 1.6684 6.32725 1.52056 7.34095 1.69807C8.35464 1.87558 9.28615 2.36934 10.0021 3.10861C10.718 3.84788 11.1816 4.79476 11.3265 5.81363C11.3897 6.25789 11.801 6.56681 12.2453 6.50363C12.6896 6.44045 12.9985 6.02909 12.9353 5.58483C12.7421 4.22635 12.124 2.96385 11.1694 1.97815C10.2148 0.992452 8.97283 0.334114 7.62124 0.0974319C6.26966 -0.139249 4.87784 0.0578646 3.64512 0.660543Z" fill="#FFFFFB" />
</svg>

const SuggetionPosts = ['Stocks, the heartbeat of the marketStocks, the heartbeat of the market! ! Whether you are a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape.',
    'Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started',
    'Stocks, the heartbeat of the marketStocks, the heartbeat of the market! Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!Stocks, the heartbeat of the marketStocks, the heartbeat of the market!'
]

const sharingListOptions = ['Subreddit | Mega Projects', 'Subreddit | Mega Projects', 'Subreddit | Mega Projects', 'Subreddit | Mega Projects']

const TimeRange = ["1 min", "5 min", "10 min", "15 min", "20 min"]



const ShareCampaign = () => {


    const [PostText, setPostText] = useState<string>("")


    return (
        <div className="flex flex-col h-full">

            <div className={"flex flex-col w-full h-[80vh] py-[1vw] " + styles.add_post_wrapper}>
                <Link href={"/social-media/campaigns"}>
                    <h6 className='flex items-center gap-[0.5vw]'> <svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" viewBox="0 0 11 22" fill="none">
                        <path d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z" fill="#2A2B2A" />
                    </svg> Pacific Allies ABANDO...</h6>
                </Link>

                <div className="grid grid-cols-2 gap-[5vw] w-full h-full">

                    <div className={styles.post_content + " flex flex-col justify-between"}>

                        <div className={styles.post_content}>
                            <h6>Post</h6>
                            <textarea name="" id="" maxLength={280} rows={2} value={PostText} onChange={(e) => setPostText(e.target.value)}></textarea>
                            <span>{PostText?.length}/280</span>
                        </div>

                        <div className={styles.suggestions + " flex flex-col justify-between"}>
                            <div className='flex flex-col space-y-[0.7vw]'>
                                <h6>Caption Suggestions</h6>
                                {SuggetionPosts.map(ele => <div className={styles.item} onClick={() => setPostText(ele.length < 280 ? ele : '')}>
                                    <p>{ele}</p>
                                    <a href="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="none">
                                            <path d="M8.82382 7.31382L10.9435 5.16709C11.1292 4.98134 11.3412 4.743 11.5531 4.47752C11.7651 4.23919 12.0033 4.02714 12.2424 3.84139C12.6927 3.4436 13.2226 3.09924 13.8856 3.09924C14.469 3.09924 14.9718 3.36472 15.3431 3.70908C15.7145 4.05343 15.9265 4.55725 15.9265 5.1408C15.9265 5.37913 15.9002 5.64461 15.8205 5.83036C15.6348 6.20187 15.4762 6.4665 15.3168 6.67854C15.2371 6.78456 15.1574 6.89058 15.1574 6.99661C15.1574 7.07633 15.1574 7.15606 15.2109 7.18236C15.5025 7.89822 15.7145 8.50806 15.8468 9.25021C15.9265 9.54198 16.085 9.6743 16.3504 9.6743C16.4564 9.6743 16.5624 9.64801 16.6683 9.56828C16.8803 9.43596 17.066 9.22392 17.2517 9.01187C17.3577 8.90585 17.4374 8.79983 17.4899 8.7464C18.4438 7.81849 19 6.49364 19 5.14165C19 3.70992 18.4167 2.43766 17.4899 1.5106C16.5624 0.608991 15.2643 0 13.8865 0C12.5087 0 11.1835 0.556404 10.2567 1.53774L6.62698 5.14249C5.67312 6.12298 5.1432 7.39525 5.1432 8.74724C5.1432 9.14504 5.3026 9.96692 5.56714 10.7354C5.83252 11.4775 6.17676 12.1399 6.62698 12.1399C6.86523 12.1399 7.36887 11.7422 7.79281 11.2918C8.21674 10.8414 8.64068 10.3376 8.64068 10.1518C8.64068 10.0195 8.5347 9.86005 8.42871 9.62171C8.29644 9.38338 8.24303 9.0916 8.24303 8.74724C8.24303 8.21713 8.455 7.68702 8.82637 7.31552L8.82382 7.31382ZM8.74497 17.4919L12.3747 13.8872C13.3286 12.9593 13.8585 11.6073 13.8585 10.2561C13.8585 9.85835 13.6991 9.06361 13.4346 8.29432C13.1963 7.55216 12.8249 6.86259 12.3747 6.86259C12.189 6.86259 11.6328 7.28668 11.2352 7.73706C10.785 8.18745 10.361 8.66497 10.361 8.85072C10.361 8.98304 10.4407 9.19508 10.573 9.40712C10.7053 9.64546 10.8112 9.91094 10.8112 10.2553C10.785 10.7854 10.573 11.3155 10.2016 11.7396L8.05565 13.86C7.86996 14.0721 7.658 14.2841 7.44603 14.5225L6.78384 15.1849C6.33362 15.609 5.77656 15.9008 5.11437 15.9008C4.00112 15.9008 3.10067 15.0263 3.10067 13.8863C3.10067 13.6209 3.15409 13.3825 3.23294 13.1968C3.39234 12.8253 3.55089 12.5606 3.73658 12.3486C3.81628 12.2426 3.84256 12.1366 3.84256 12.0568C3.84256 12.0034 3.81628 11.9508 3.78915 11.8448C3.47119 11.1289 3.28551 10.5191 3.15324 9.77693C3.09983 9.64461 3.07354 9.53859 2.99384 9.48516C2.91414 9.37913 2.78187 9.35284 2.64961 9.35284C2.54362 9.35284 2.46392 9.37913 2.35794 9.45886C2.14597 9.59118 1.934 9.80322 1.74832 10.0153C1.66862 10.1213 1.56263 10.201 1.51006 10.2536C0.556205 11.2078 0 12.5335 0 13.8846C0 15.2892 0.556205 16.5886 1.51006 17.5157C2.43764 18.4436 3.70945 19 5.11353 19C6.49132 19 7.81655 18.4699 8.74327 17.4894L8.74497 17.4919Z" />
                                        </svg>
                                    </a>
                                </div>)}
                            </div>
                            <CustomBtn btnColor='black' word='Re-Generate' icon={reGenerateIcon} />

                        </div>

                    </div>

                    <div className={styles.campaign_details + ' h-full flex flex-col justify-between'}>
                        <div>
                            <h6>Campaign Details</h6>
                            <div className={styles.sharing_list + " mb-[1.5vw]"}>
                                <label htmlFor="">Sharing List</label>
                                <CustomSelectInput options={sharingListOptions} />
                            </div>
                            <div className={styles.schadule_campaign}>
                                <h6>Schedule</h6>

                                <div className='grid grid-cols-2 gap-[15%] mb-[1.5vw]'>
                                    <div className={styles.time_range}>
                                        <p>Time Range Between Posts</p>
                                        <span>Best Posting Time*</span>
                                        <CustomSelectInput options={TimeRange} />
                                    </div>
                                    <div className={styles.sleep_time}>
                                        <p>Sleep Time</p>
                                        <span>Suggested*</span>
                                        <CustomSelectInput options={TimeRange} />
                                    </div>
                                </div>
                                <div className={styles.upload_time + " mb-[1.5vw]"}>
                                    <p>Upload Time</p>
                                    <CustomSelectInput options={TimeRange} />
                                </div>
                                <CustomBtn word='Schadule' btnColor='black' />
                            </div>
                        </div>

                        <CustomBtn btnColor='black' word='Publish Now' />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ShareCampaign
