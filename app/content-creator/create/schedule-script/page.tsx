import CustomBtn from "@/app/_components/Button/CustomBtn"
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle"

const ScheduleScript = () => {

    return (
        <div className="flex flex-col">
            <div className="flex justify-center items-center h-[75vh] py-[1.5vw] w-full gap-[10vw] ">
                <div className="flex flex-col gap-[2vw]">
                    <LogoAndTitle title={"Your Script Has Been Scheduled!"} needTxt={false} />
                    <div className="flex justify-center gap-[1.5vw]">
                        <CustomBtn word="Dashboard" btnColor="black" href={"/content-creator/dashboard"} />
                        <CustomBtn word="Convert To Article" btnColor="black" href={"/content-creator/create/article-generated-titles"} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ScheduleScript