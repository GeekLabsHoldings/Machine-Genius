"use client"
import { ReactNode, useState } from 'react';
import styles from './TopicCollapse.module.css'

interface IProps {
    children: React.ReactNode
    title: string,
    date?: string,
    svgBtn:ReactNode,
    replyTxt?:string,
    replyDate?:string,
    ownerName?:string,
    ownerStatus?:'online' | 'offline' | 'away',
    forComments:boolean
}

const TopicColapse = (props: IProps) => {

    const [isCollapseOpen, setIsCollapseOpen]= useState(false);
    
    return (
        <div className={`${styles.topic_collapse} topic_collapse ${isCollapseOpen ? styles.open : ''}`}>
            <div className={`${styles.collapse_header}  collapse_header`} onClick={()=>setIsCollapseOpen(!isCollapseOpen)}>
                <div>
                    <h6>{props.title}</h6>
                    {props.date && <p>{props.date}</p> }
                </div>
                <label htmlFor='toggle-fav' className={`${styles.toggle_fav} toggle_fav`}>
                    <input type="checkbox" name="toggle-fav" id="toggle-fav" />
                    {props.svgBtn}
                </label>
            </div>

            <div className={props.replyTxt ? `${styles.collapse_body } flex flex-col gap-[0.4vw]` : styles.collapse_body } >
               <div className={props.forComments ? styles.separator : ''}>
               <div className={props.replyTxt ? styles.separator : ''}>
                {props.children}
                </div>
                {props.replyTxt ? 
        <div>
        <div>
                        <div className='flex items-center gap-[0.5vw]'>
                            <h6>{props.ownerName}</h6>
                            <div className={props.ownerStatus === 'online' ? styles.onlineStatus : props.ownerStatus === 'offline' ? styles.offlineStatus : styles.awayStatus }>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5.5" cy="5.5" r="5.5"/>
                            </svg>
                            </div>
                        </div>
                
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
                            <p>Reply...</p>
                            </div>
                        </div> : null}
               
            </div>
        </div>
    )
}

export default TopicColapse
