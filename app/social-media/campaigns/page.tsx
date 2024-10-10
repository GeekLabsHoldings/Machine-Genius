import React from 'react'
import styles from './Campaigns.module.css'
import Sharing from './_sharing/sharing'



const Page = () => {
  // campaigns page
  return (
    <div className="flex flex-col h-full">
    <div className={"flex flex-col w-full h-[80vh] py-[1vw] " + styles.campaigns_wrapper}>
        <div className={"tabs " + styles.tabs}>
            <input type="radio" name="tabs" className="tab" aria-label="Lists" />
            <div className="tab-content h-[75vh] pt-[1vw]"></div>

            <input type="radio" name="tabs" className="tab" aria-label="Sharing" defaultChecked />
            <div className="tab-content h-[75vh] pt-[1vw]"><Sharing/></div>
        </div>
    </div>
</div>
  )
}

export default Page
