import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './chooseArticles.module.css'

const chooseArticles = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center items-center py-[2vw] m-auto h-full gap-[2rem]">
                 <div className={styles.scripts_wrapper}>
                    
                 </div>
            </div>

            <div className="flex justify-between w-full">
                <CustomBtn word={"Back"} btnColor="white" href={"/content-creator/working-on-article"} />
                <CustomBtn word={"Next"} btnColor="black" href={"/content-creator/create-article"} />

            </div>
        </div>
    )
}

export default chooseArticles
