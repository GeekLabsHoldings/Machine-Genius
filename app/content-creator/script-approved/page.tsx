import CustomBtn from '@/app/_components/Button/CustomBtn'
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'
import styles from './script-approved.module.css'
import TopicColapse from '@/app/_components/TopicCollapse/TopicCollapse'
import ArticleWithCheck from '@/app/_components/ArticleWithCheck/ArticleWithCheck'

const ScriptApproved = () => {
    return (
        <div className="flex flex-col h-full">



            <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] py-[2vw] m-auto space-y-[2vw] h-full">
                <LogoAndTitle needTxt={true} textNeeded='Hold on tight.' title='Script is yet to be approved' />
                <CustomBtn word="Dashboard" btnColor="black" href="/dashboard" />
            </div>


        </div>
    )
}

export default ScriptApproved
