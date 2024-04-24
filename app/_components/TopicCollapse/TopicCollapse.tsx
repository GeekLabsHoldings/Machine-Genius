"use client"
import { ReactNode, useState } from 'react';
import styles from './TopicCollapse.module.css'

type personStatus = 'online' | 'offline' | 'away'

interface IProps {
    children: React.ReactNode
    title: string,
    date?: string,
    svgBtn:ReactNode,
    replyTxt?:string,
    replyDate?:string,
    ownerName?:string,
    ownerStatus?:personStatus,
    forComments:boolean,
    managerStatus?:personStatus
}

const TopicColapse = (props: IProps) => {

    const [isCollapseOpen, setIsCollapseOpen]= useState(false);
    
    return (
        <div className={`${styles.topic_collapse} topic_collapse ${isCollapseOpen ? styles.open : ''}`}>
            <div className={`${styles.collapse_header}  collapse_header`} onClick={()=>setIsCollapseOpen(!isCollapseOpen)}>
                <div>
                    {/* the title part is apparent by default */}
                <div className='flex items-center gap-[0.5vw]'>
                            <h6>{props.title}</h6>
                            {/* in comments page we need the status of manager who commented on title */}
                            <div className={props.managerStatus === 'online' ? styles.onlineStatus : props.managerStatus === 'offline' ? styles.offlineStatus : styles.awayStatus }>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5.5" cy="5.5" r="5.5"/>
                            </svg>
                            </div>
                        </div>
                        {/* if you need the date of comment or article */}
                    {props.date && <p>{props.date}</p> }
                </div>
                {/* the icon of check box button related to page and it enables you to put the article title in loved articles or put the comment to comments taken into consideration  */}
                <label htmlFor='toggle-fav' className={`${styles.toggle_fav} toggle_fav`}>
                    <input type="checkbox" name="toggle-fav" id="toggle-fav" />
                    {props.svgBtn}
                </label>
            </div>
            {/* this part appears when click on title and expand */}
            <div className={props.replyTxt ? `${styles.collapse_body } flex flex-col gap-[0.4vw]` : styles.collapse_body } >
               <div className={props.forComments ? styles.separator : ''}>
               <div className={props.replyTxt ? styles.separator : ''}>
                {props.children}
                </div>
                {/* in comments page .. this part for replies */}
                {props.replyTxt ? 
        <div>
        <div>
            {/* info about owner of article */}
                        <div className='flex items-center gap-[0.5vw]'>
                            <h6>{props.ownerName}</h6>
                            <div className={props.ownerStatus === 'online' ? styles.onlineStatus : props.ownerStatus === 'offline' ? styles.offlineStatus : styles.awayStatus }>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5.5" cy="5.5" r="5.5"/>
                            </svg>
                            </div>
                        </div>
                {/* reply part */}
                    <div className="flex flex-col gap-[0.2vw]">
                                <p>{props.replyTxt}</p>
                            <div className='flex justify-end'>
                            <p>{props.replyDate}</p>
                            </div>

                            </div> 
                        </div>

                        
        </div>
               : null} 
               </div>
               {props.forComments ? <div className='pt-[0.3vw]'>
                            <div>
                            {/* <p>Reply...</p> */}
                            <input type="text" placeholder='Reply...' className={`${styles.replyInput} w-full`} />
                            </div>
                        </div> : null}
               
            </div>
        </div>
    )
}

export default TopicColapse
