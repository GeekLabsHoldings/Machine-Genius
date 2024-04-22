'use client'
import { useState } from "react";
import styles from './create-article.module.css'
import ArticleWithCheck from "../../_components/ArticleWithCheck/ArticleWithCheck";
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";

const CreateArticle = ()=>{
    const [selectedText,setSelectedText]= useState<string[]>([]);
    const renderSelectedTxt = selectedText.map(oneTxt =>(
        <div>
            <div className={`mb-3`}>
           <ArticleWithCheck article={oneTxt}/>
      </div>
        </div>
      ))

    return(
            <div className="flex flex-col gap-6">
            <div className='flex justify-between gap-8'>
                        <div className="w-7/12">
                            <ArticlePreview withSelect={true} selectedText={selectedText} setSelectedText={setSelectedText}/>
                        </div>

                        <div className={`w-5/12 ${styles.selectionsHeader} flex flex-col gap-4`}>
                <h2>Selections</h2>
                
                <div className={`${styles.selectionsParent}`}>
                {renderSelectedTxt}
                </div>
                </div>

                    </div>
                    <div className="flex justify-between">
                        <CustomBtn word={"Back"} btnColor="white" href={""}/>
                        <CustomBtn word={"Next"} btnColor="black" href={""}/>

                    </div>
            </div>

    )

}
export default CreateArticle