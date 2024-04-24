import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"

// page enables you to have a look to your article
const FinalArticle = ()=>{
    console.log()
    return(
        <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]" >
{/* section to display article */}
        <div className="w-4/5 mx-auto">
                <ArticlePreview yourNewArticle={true} height="h-[75vh]" withEdit={false} />
        </div>

            </div>
{/* buttons to move to last or next page */}
            <div className="flex justify-between items-center">
                <CustomBtn
                word={"Back"}
                btnColor="white"
                href={"/content-creator/create-article"}
                />
                <CustomBtn
                word={"Next"}
                btnColor="black"
                href={"/content-creator/genuis-checker"}
                />
            </div>
        </div>
   
    )
}

export default FinalArticle