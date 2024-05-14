"use client";
import styles from './CustomCheckBox.module.css'
import $ from 'jquery'
type IProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement> , HTMLInputElement> &{
    value? : string,
    

  }

const CustomCheckBox = (props:IProps) => {
  // $('input').attr('checked','checked');

  return (
    <input className={`${styles.custom_checkbox} bg-red-300`}  type="checkbox" {...props}/>
  )
}

export default CustomCheckBox
