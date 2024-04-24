"use client"
import { useState } from 'react';
import styles from './ErrorCollapse.module.css'

interface IProps {
    children: string
    title: string,
    date?: string
}

const ErrorCollapse = (props: IProps) => {

    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    return (
        <div className={`${styles.topic_collapse} topic_collapse ${isCollapseOpen ? styles.open : ''}`}>
            <div className={`${styles.collapse_header}  collapse_header`} onClick={() => setIsCollapseOpen(!isCollapseOpen)}>
                <div>
                    <h6>{props.title}</h6>
                    {props.date && <p>{props.date}</p>}
                </div>
                <label htmlFor='toggle-fav' className={`${styles.toggle_fav} toggle_fav`}>
                    {isCollapseOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g filter="url(#filter0_i_623_12397)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM16.4485 8.75147C16.9171 9.2201 16.9171 9.97992 16.4485 10.4485L12.0292 14.8679C11.3503 15.5467 10.2497 15.5467 9.57082 14.8679L7.55147 12.8485C7.08284 12.3799 7.08284 11.6201 7.55147 11.1515C8.0201 10.6829 8.7799 10.6829 9.24853 11.1515L10.8 12.703L14.7515 8.75147C15.2201 8.28284 15.9799 8.28284 16.4485 8.75147Z" fill="#F36F24" />
                        </g>
                        <defs>
                            <filter id="filter0_i_623_12397" x="0" y="0" width="24" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_623_12397" />
                            </filter>
                        </defs>
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g filter="url(#filter0_i_627_12413)">
                            <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 18C11.28 18 10.8 17.52 10.8 16.8C10.8 16.08 11.28 15.6 12 15.6C12.72 15.6 13.2 16.08 13.2 16.8C13.2 17.52 12.72 18 12 18ZM13.2 12C13.2 12.72 12.72 13.2 12 13.2C11.28 13.2 10.8 12.72 10.8 12V7.2C10.8 6.48 11.28 6 12 6C12.72 6 13.2 6.48 13.2 7.2V12Z" fill="#E9313E" />
                        </g>
                        <defs>
                            <filter id="filter0_i_627_12413" x="0" y="0" width="24" height="25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_627_12413" />
                            </filter>
                        </defs>
                    </svg>}
                </label>
            </div>
            <div className={styles.collapse_body} >
                {props.children}
            </div>
        </div>
    )
}

export default ErrorCollapse
