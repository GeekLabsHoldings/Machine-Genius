import CustomBtn from "@/app/_components/Button/CustomBtn"
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle"

    // page appears when genuis finished checking
const ArticleReady = ()=>{
    return(
        <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center m-auto h-[75vh] py-[1.5vw] space-y-[2vw]" >
            <LogoAndTitle title="Your Script  Is Ready!" needTxt={false}/>

            {/* button leads you to show errors page */}
            <CustomBtn word={"Results"} btnColor="black" href={"/content-creator/create/article-comments"}/>
        
        </div>
        </div>
    )
}

export default ArticleReady