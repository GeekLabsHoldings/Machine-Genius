"use client"
import { useState } from 'react';
import styles from './TopicCollapse.module.css'

interface IProps {
    children: React.ReactNode
    title: string,
    date: string
}

const TopicColapse = (props: IProps) => {

    const [isCollapseOpen, setIsCollapseOpen]= useState(false);
    
    return (
        <div className={`${styles.topic_collapse} topic_collapse ${isCollapseOpen ? styles.open : ''}`}>
            <div className={`${styles.collapse_header}  collapse_header`} onClick={()=>setIsCollapseOpen(!isCollapseOpen)}>
                <div>
                    <h6>Canada Hates People</h6>
                    <p>April 16th 2024</p>
                </div>
                <label htmlFor='toggle-fav' className={`${styles.toggle_fav} toggle_fav`}>
                    <input type="checkbox" name="toggle-fav" id="toggle-fav" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" fill="none">
                        <g filter="url(#filter0_i_623_11960)">
                            <path d="M11.3675 3.38104C7.17949 -2.47623 0 -0.121939 0 5.8532C0 11.8284 11.9659 20 11.9659 20C11.9659 20 23.3333 11.5004 23.3333 5.8532C23.3333 0.205986 16.7522 -2.47621 12.5641 3.38104L11.9659 3.84887L11.3675 3.38104Z" />
                        </g>
                        <defs>
                            <filter id="filter0_i_623_11960" x="0" y="0" width="23.333" height="21.1111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="1.11111" />
                                <feGaussianBlur stdDeviation="1.66667" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_623_11960" />
                            </filter>
                        </defs>
                    </svg>
                </label>
            </div>
            <div className={styles.collapse_body} >
                {props.children}
            </div>
        </div>
    )
}

export default TopicColapse
