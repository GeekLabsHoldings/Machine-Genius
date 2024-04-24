
import SpecificChecker from '@/app/_components/SpecificChecker/SpecificChecker';
import styles from './checker-after-solve-errors.module.css';
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle';
import CustomBtn from '@/app/_components/Button/CustomBtn';
const GenuisChecker = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]" >
                <div className={`${styles.genuisWorking} m-auto`}>
                    <LogoAndTitle needTxt={false} title='Genius is working on your article..' />
                    <div className={`${styles.allCheckers} w-full`}>
                        <SpecificChecker pass={true} word='Grammar Checker' />
                        <SpecificChecker pass={true} word='Plagiarism Checker' />
                        <SpecificChecker pass={true} word='AI Checker' />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center">
                <CustomBtn word="Requist approve" btnColor="black" href="/content-creator/script-approved" />
            </div>
        </div>
    )
}

export default GenuisChecker