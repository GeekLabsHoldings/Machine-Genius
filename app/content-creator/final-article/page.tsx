import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"

const FinalArticle = ()=>{
    return(
        <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]" >

        <div className="w-4/5 mx-auto">
                <ArticlePreview height="h-[75vh]" withEdit={false} />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <CustomBtn
                word={"Back"}
                btnColor="white"
                href={"/content-creator/work-on-article"}
                />
                <CustomBtn
                word={"Next"}
                btnColor="black"
                href={"/content-creator/final-article"}
                />
            </div>
        </div>
   
    )
}

export default FinalArticle