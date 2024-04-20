'use client';
import styles from './CustumBtn.module.css';
import { IBtn } from "@/app/interfaces/interfaces";
import { useState } from 'react';

const CustomBtn = ({word,icon,btnColor}:IBtn)=>{
    const [hoverEffect, setHoverEffect] = useState(false);

    const controlIconBg = (icon:IBtn['icon']) => {
        if (icon) {
            if (btnColor === "white") {
                icon.props.fill = "#2A2B2A"; 
            } else if (btnColor === "black") {
                icon.props.fill = "#FFFFFB";
            }
        }
        return icon
    }

return(
    <button className = {btnColor === 'white' ? styles.whiteBtn : styles.blackBtn} >
    <div className={styles.iconAndTxtBtn}>
    {icon ? controlIconBg(icon) : null}
    <span>{word}</span>
    </div>
    </button>
)

}

export default CustomBtn;
