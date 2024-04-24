import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './working-on-article.module.css'
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'

const WorkingOnArticle = () => {
    return (
        <div className="flex flex-col h-full">

            <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] py-[2vw] m-auto h-full">
                <LogoAndTitle needTxt={true} textNeeded='Hold on tight.' title='Genius is working on your article..'/>
            </div>


            <div className="flex justify-between items-center">
                <CustomBtn word="Back" btnColor="white" href="/content-creator/create-article" />
                <CustomBtn word="Next" btnColor="black" href="/content-creator/final-article" />
            </div>

        </div>
    )
}

export default WorkingOnArticle
