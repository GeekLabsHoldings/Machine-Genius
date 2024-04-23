'use client';
import styles from './ArticlePreview.module.css';
import { ArticlePreviewData } from '../../data/data';
import { IArticleProps } from '@/app/interfaces/interfaces';
import { useState } from 'react';
import CustomSelectInput from '../CustomSelectInput/CustomSelectInput';
import { SelectArticleData } from '../../data/data';


const ArticlePreview = ({withEdit,selectedText,setSelectedText,beginSelect,height}:IArticleProps)=>{

  const [highlightedBefore , setHighlightedBefore] = useState<string[]>([]);

// {beginSelect ?  document.addEventListener('mouseup', e => {
//   const selected = window.getSelection() as Selection
//   if(selectedText&& setSelectedText){
//     setSelectedText([...selectedText, selected.toString()]);
//   }
//   const DetectEqual = ArticlePreviewData.map((article)=>(
//     article.sectionData.map((everyData)=>(
//       setHighlightedBefore([...highlightedBefore,JSON.stringify(selectedText?.filter(element => everyData.includes(element)))])
//     ))
//   ))

// }) : null}


  const renderArticleData = ArticlePreviewData.map(article =>(
      <div className={` ${styles.articlePreview} ${height}`}>
        <div className={`${styles.articlePreviewData}`}>
      <div className={`${styles.articleHeader} `}>
          <h1 className="mx-auto">{article.title}</h1>
          <div className='cursor-pointer' >
            {withEdit ? <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12C0 14.3734 0.703789 16.6934 2.02236 18.6668C3.34094 20.6402 5.21508 22.1783 7.40779 23.0865C9.60051 23.9948 12.0133 24.2324 14.3411 23.7694C16.6689 23.3064 18.807 22.1635 20.4853 20.4853C22.1635 18.807 23.3064 16.6689 23.7694 14.3411C24.2324 12.0133 23.9948 9.60051 23.0865 7.4078C22.1783 5.21508 20.6402 3.34094 18.6668 2.02236C16.6934 0.703788 14.3734 0 12 0C10.4241 0 8.8637 0.310389 7.40779 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C2.40042 4.62902 1.5165 5.95189 0.913445 7.4078C0.310389 8.8637 0 10.4241 0 12ZM17.8659 9.88253L14.1523 6.17052L15.6165 4.70633C15.842 4.48196 16.1472 4.35602 16.4653 4.35602C16.7834 4.35602 17.0886 4.48196 17.3141 4.70633L19.3285 6.72224C19.5529 6.94776 19.6788 7.25293 19.6788 7.57105C19.6788 7.88916 19.5529 8.19434 19.3285 8.41985L17.8659 9.88253ZM5.39144 18.9178C5.19439 18.9178 5.0792 18.7662 5.12921 18.5434L5.99772 14.6904C6.07898 14.3902 6.23071 14.1138 6.44032 13.884L13.3066 7.01781L14.2675 7.98181L7.4028 14.8465L7.02084 14.4646C6.92093 14.5842 6.84525 14.7222 6.79803 14.8708L6.41455 16.5745L7.4604 17.6203L9.16559 17.2383C9.31419 17.1905 9.45212 17.1143 9.5718 17.014L8.25161 15.6953L15.1178 8.8291L17.017 10.7313L10.1508 17.5945C9.92063 17.8047 9.64368 17.9569 9.34293 18.0386L5.48996 18.9072C5.45716 18.9149 5.42361 18.919 5.38992 18.9193L5.39144 18.9178Z" fill="#2A2B2A" />
            </svg> : null}
          </div>
        </div>

        <div className={`${styles.articleContent} `}>
          {article.sectionData.map((singleData) => (
            // setHighlightedBefore([...highlightedBefore,selectedText.filter(element => article.sectionData.includes(element))]);
            // highlightedBefore.length ? highlightedBefore.map((ele)=>(<p className={styles.highlightedBefore}>{ele}</p>)) : <p className={beginSelect ? styles.beginSelection : ''}>{singleData}</p> 
            <p className={beginSelect ? styles.beginSelection : ''}>{singleData}</p>
          ))}
        </div>
      </div>
    </div>
  ))

return(

     <div>
  {renderArticleData}
    </div>


  )
}

export default ArticlePreview