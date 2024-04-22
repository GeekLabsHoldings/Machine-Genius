'use client'
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox'
import styles from './ArticleWithCheck.module.css'

interface IProps {
  article : string,
  name : string
}


const ArticleWithCheck = ({ article , name }: IProps) => {


  return (

      article ? <div className={styles.article_with_check}>
        <CustomCheckBox name={name} value={article} />
        <label className={styles.article}>
          {article}
        </label>
      </div> : null

  )
}

export default ArticleWithCheck
