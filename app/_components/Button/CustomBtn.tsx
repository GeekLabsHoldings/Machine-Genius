'use client';
import styles from './CustumBtn.module.css';
import { IBtn } from "@/app/interfaces/interfaces";

const CustomBtn = ({word,icon,btnColor}:IBtn)=>{

return(
    <button className = {btnColor === 'white' ? styles.whiteBtn : styles.blackBtn}>
    <div className={styles.iconAndTxtBtn}>
        {/* {icon && btnColor === 'white' ? icon.props.fill ='#2A2B2A' : icon.props.fill= '#FFFFFB'} */}
        {/* {icon && btnColor === 'white' ? icon.props.fill = '#2A2B2A' : icon.props.fill = '#FFFFFB'} */}
    {icon ? icon : null}
    <span>{word}</span>
    </div>
    </button>
)

}

export default CustomBtn;
{/* <img src={icon.src} alt="button-icon"/> */}