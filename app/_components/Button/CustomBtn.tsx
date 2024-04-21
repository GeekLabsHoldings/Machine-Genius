'use client';
import styles from './CustumBtn.module.css';
import { IBtn } from "@/app/interfaces/interfaces";

const CustomBtn = ({word,icon,btnColor}:IBtn)=>{


return(
    <button className = {btnColor === 'white' ? styles.whiteBtn : styles.blackBtn}
    >
    <div className={styles.iconAndTxtBtn}>
    {icon ? icon : null}
    <span>{word}</span>
    </div>
    </button>
)

}

export default CustomBtn;
