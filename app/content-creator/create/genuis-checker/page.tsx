
import SpecificChecker from '@/app/_components/SpecificChecker/SpecificChecker';
import styles from './genuis-checker.module.css';
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle';
import CustomBtn from '@/app/_components/Button/CustomBtn';

// loading page for article ready page to display all the results of checking
const GenuisChecker = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]" >
                <div className={`${styles.genuisWorking} m-auto`}>
                    <LogoAndTitle needTxt={false} title='Genius is working on your article..' />
                    <div className={`${styles.allCheckers} w-full`}>
                        <SpecificChecker pass={true} word='Grammar Checker' />
                        <SpecificChecker pass={false} word='Plagiarism Checker' />
                        <SpecificChecker pass={true} word='AI Checker' />
                    </div>
                    <CustomBtn word={"Results"} btnColor="black" href="/content-creator/create/show-errors" />
                </div>
            </div>
        </div>
    )
}

export default GenuisChecker



