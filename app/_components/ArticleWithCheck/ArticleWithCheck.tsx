'use client'
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox'
import styles from './ArticleWithCheck.module.css'

interface IProps {
  article : string,
  name : string
  accsentColor? : string
}


const ArticleWithCheck = ({ article , name, accsentColor}: IProps) => {


  return (

      article ? <div className={`${styles.article_with_check} group`}>
        <CustomCheckBox name={name} value={article} accentColor={accsentColor} />
        <label className={`${styles.article} group-hover:bg-[${accsentColor ? accsentColor : 'var(--orange)'}]`}>
          {article}
        </label>
      </div> : null

  )
}

export default ArticleWithCheck
