'use client'
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import styles from './final-artical.module.css'
// page enables you to have a look to your article
const FinalArticle = () => {

    const [IsLoading, setIsLoading] = useState(false);

    const router = useRouter()
  
    const handleNavigate = () => {
  
      setIsLoading(true)
  
    //   setTimeout(() => {
    //     // Your action here
    //     router.push('/content-creator/create/movie-myth/show-errors')
  
    //   }, 1500); // 3000 milliseconds = 3 seconds
  
    }

    return (

         <div className="flex flex-col h-full">

            { IsLoading ? <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]" >
                <div className={`${styles.genuisWorking} m-auto`}>
                    <LogoAndTitle needTxt={false} title='Genius is working on your article..' />
                    <div className={`${styles.allCheckers} w-full`}>
                        <SpecificChecker pass={true} word='Grammar Checker' />
                        <SpecificChecker pass={false} word='Plagiarism Checker' />
                        <SpecificChecker pass={true} word='AI Checker' />
                    </div>
                    <CustomBtn word={"Results"} btnColor="black" href="/content-creator/create/movie-myth/show-errors" />
                </div>
            </div> : <><div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw] w-11/12 " >
                {/* section to display article */}
                <div className="w-4/5 mx-auto h-full">
                    <ArticlePreview yourNewArticle={true} height="h-full" withEdit={false} />
                </div>

            </div>
            {/* buttons to move to last or next page */}
            <div className="flex justify-between items-center">
                <CustomBtn
                    word={"Back"}
                    btnColor="white"
                    href={"/content-creator/create/create-article"}
                />
                <CustomBtn
                    word={"Next"}
                    btnColor="black"
                    onClick={handleNavigate}
                />
            </div></>}
            
        </div>
        

    )
}

export default FinalArticle