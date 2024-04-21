'use client'
import styles from './ArticleWithCheck.module.css'

interface IProps {
  article: string
}


const ArticleWithChecked = ({ article }: IProps) => {


  return (

    <div className={styles.article_with_check}>
      <input type="checkbox" name="check-article" id="" />
      <label className={styles.article}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      </label>
    </div>

  )
}

export default ArticleWithChecked
