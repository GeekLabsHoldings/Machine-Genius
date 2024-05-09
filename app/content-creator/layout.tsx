'use client'
import React, { useEffect, useState } from 'react'
import styles from './contentCreator.module.css'
import SideNav from '../_components/SideNav/SideNav';
import TitleOfPage from '../_components/TitleOfPage/TitleOfPage';


const layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [CurrentPage, setCurrentPage] = useState<string>('Content Creator');
  
  return (
    <div className='w-full h-100vh p-0 flex'>
      <div className={`${styles.Side_Nav_Wrapper} ${isSideNavOpen ? '' : styles.close}`}>
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} setCurrentPage={setCurrentPage} />
      </div>
      <div className={styles.Page_Wrapper}>
        <TitleOfPage title={CurrentPage} />
        <div className='h-full'>
        {children}
        </div>
      </div>
    </div>
  )
}

export default layout
 