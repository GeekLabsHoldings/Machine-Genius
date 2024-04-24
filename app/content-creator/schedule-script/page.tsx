import CustomBtn from "@/app/_components/Button/CustomBtn"
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle"

const ScheduleScript = ()=>{
    return(
        <div className="flex flex-col h-full">
        <div className="flex justify-center items-center h-[80vh] py-[1.4vw] w-full gap-[10vw] ">
        <div className="flex flex-col gap-[2vw]">
        <LogoAndTitle title={"Your Script Has Been Scheduled!"} needTxt={false}/>
        <div className="flex justify-center gap-[1.5vw]">
        <CustomBtn word="Dashboard" btnColor="black" href={""}/>
        <CustomBtn word="Convert To Article" btnColor="black" href={""}/>

        </div>
        </div>
        </div>
        </div>
    )

}

export default ScheduleScript