'use client'
import styles from './ArticleWithCheck.module.css'

interface IProps {
  article: string
}


const ArticleWithCheck = ({ article }: IProps) => {


  return (

      article ? <div className={styles.article_with_check}>
      <input type="checkbox" name="check-article" id="" />
      <label className={styles.article}>
        {article}
      </label>
      </div> : null

  )
}

export default ArticleWithCheck
