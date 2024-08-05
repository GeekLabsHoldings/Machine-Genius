import CustomBtn from '@/app/_components/Button/CustomBtn'
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'
import styles from './script-approved.module.css'
import TopicColapse from '@/app/_components/TopicCollapse/TopicCollapse'
import ArticleWithCheck from '@/app/_components/ArticleWithCheck/ArticleWithCheck'

// shows that the script in proccess of approvement
const ScriptApproved = () => {
    return (
        <div className="flex flex-col">

            <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto space-y-[2vw] h-[75vh] py-[1.5vw]">
                <LogoAndTitle needTxt={true} textNeeded='Hold on tight.' title='Script is yet to be approved' />
                <CustomBtn word="Dashboard" btnColor="black" href="/content-creator/create/comments-on-article" />
            </div>


        </div>
    )
}

export default ScriptApproved
