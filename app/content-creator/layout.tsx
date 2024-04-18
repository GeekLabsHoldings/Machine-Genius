'use client'
import React, { useState } from 'react'
import styles from './contentCreator.module.css'
import SideNav from '../_components/SideNav/SideNav';

const layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  return (
    <div className='w-full h-100vh p-0 flex'>
      <div className={`${styles.Side_Nav_Wrapper} ${isSideNavOpen ? '' : styles.close}`}>
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
      </div>
      <div className={styles.main_Wrapper}>
        {children}
      </div>

    </div>
  )
}

export default layout
