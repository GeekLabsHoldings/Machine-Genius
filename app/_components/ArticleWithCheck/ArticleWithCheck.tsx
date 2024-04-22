'use client'
import styles from './ArticleWithCheck.module.css'

interface IProps {
  article : string,
  name : string
}


const ArticleWithCheck = ({ article , name }: IProps) => {


  return (

    <div className={styles.article_with_check}>
      <input type="checkbox" name={name} id="" />
      <label className={styles.article}>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore */}
        {article}
      </label>
    </div>

  )
}

export default ArticleWithCheck
