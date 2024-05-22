"use client";
import React from 'react';
import CustomBtn from '../../Button/CustomBtn';
import styles from './NotificationsCard.module.css';

interface IProps{
    bgColor: string;
    btnText: string;
}

export default function NotificationsCard(props:IProps) {
  return (
    <div className={`w-full rounded-[11px] border border-[#2A2B2A] py-[15px] px-[25px] ${props.bgColor} ${styles.NotificationsCard}`}>
        <div className="flex flex-col gap-[10px]">
            <p className='font-bold'>John Doe</p>
            <div className='flex justify-between'>
                <div>
                    <span className='font-bold'>Date:</span><br /><span>20 March</span>
                </div>
                <div>
                    <span className='font-bold'>Time:</span><br /><span>9:45:20 AM</span>
                </div>
            </div>
            <div className={`mt-1 ${styles.NotificationsCardBtn}`}>
                  <CustomBtn word={props.btnText} btnColor="black" width="w-full" paddingVal={"py-[0.5vw] px-[1.5vw]"} />
            </div>
        </div>
    </div>
  )
}
