import React from 'react'
import styles from './templates.module.css'

const page = () => {
  return (
    <div className="flex flex-col h-full">
      <div className={"flex flex-col w-full h-[75vh] py-[1vw] " + styles.templates_wrapper}>
        <h6>Template Groups</h6>

        <div className={styles.templates_slider}>
                <div className={styles.box}></div>
        </div>
      </div>
    </div>
  )
}

export default page
