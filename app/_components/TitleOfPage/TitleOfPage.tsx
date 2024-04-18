import React from 'react'
import styles from './TitleOfPage.module.css'

const TitleOfPage = ({title}:{title:string}) => {
    return (
        <h3 className={styles.title_of_page}>{title}</h3>
    )
}

export default TitleOfPage
