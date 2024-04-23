import CustomBtn from "@/app/_components/Button/CustomBtn"
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle"

const ArticleReady = ()=>{
    return(
        <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]" >
            <LogoAndTitle title="Your Script  Is Ready!" needTxt={false}/>
          <CustomBtn word={"Results"} btnColor="black" href={""}/>
        
        </div>
        </div>
    )
}

export default ArticleReady