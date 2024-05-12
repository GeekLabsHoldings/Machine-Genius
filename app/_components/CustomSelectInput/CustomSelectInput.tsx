'use client'
import React, { useEffect, useState } from 'react'
import styles from './CustomSelectInput.module.css'
import { useRouter } from 'next/navigation';

interface Iprops {
    label?: string | number,
    options: string[] | number[],
    icon? :any ,
    theme? : 'dark',
    whenSideNavClosed?:boolean,
    getValue ?: (value:string|number)=>void
}

const CustomSelectInput = (props: Iprops) => {

    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState(props.label ? props.label : props.options[0]);

    useEffect(()=>{
        if (props.whenSideNavClosed) {
            setIsActive(false)
        }
    },[props.whenSideNavClosed])

    const handleSelectedItem = (e: any) => {
        console.log(e.innerText);
        setIsSelected(e.innerText);
        setIsActive(false);
        if (props.getValue) {
          props.getValue(e.innerText)
        }
    }


    return (
        <div className={`${styles.dropdown} ${props.theme === 'dark' ? styles.dark : null} ${props.whenSideNavClosed ? styles.onClose : null}`}>
            <div
                onClick={(e) => {
                    setIsActive(!isActive);
                }}
                className={`${styles.dropdown_btn}  ${isActive ? styles.open : ''} `}
            >
                {props.icon}
                <span>{selected}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 11" fill="none" className={styles.toggleIcon}>
                    <path d="M19.9494 2.76915e-06L1.04883 1.11645e-06C0.857472 0.000420716 0.669902 0.037347 0.506307 0.106803C0.342711 0.176259 0.209287 0.275614 0.120398 0.394177C0.0315084 0.512738 -0.00947862 0.646018 0.00184339 0.779666C0.0131673 0.913315 0.0763711 1.04227 0.184657 1.15266L9.63492 10.703C10.0266 11.099 10.9695 11.099 11.3622 10.703L20.8125 1.15266C20.9219 1.0425 20.986 0.913482 20.998 0.779611C21.0099 0.64574 20.9692 0.51214 20.8802 0.393327C20.7912 0.274514 20.6574 0.17503 20.4933 0.105687C20.3292 0.0363435 20.1411 -0.000207976 19.9494 2.76915e-06Z" fill="#2A2B2A" />
                </svg>
            </div>
            <div
                className={styles.dropdown_content}
                style={{ display: isActive ? "block" : "none" }}
            >
                {props.options.map((ele, idx) => (
                    <div
                        onClick={(e) => {
                            handleSelectedItem(e.target);
                            setIsActive(!isActive);

                        }}
                        className={styles.item}
                        key={idx}
                    >
                        {ele}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CustomSelectInput
