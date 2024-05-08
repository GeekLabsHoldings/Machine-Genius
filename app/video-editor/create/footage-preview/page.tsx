'use client';
import styles from './footage.module.css'
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomCheckBox from '@/app/_components/CustomCheckBox/CustomCheckBox';
import { SimplePagination } from "@/app/_components/Pagination/pagination";
import VideoPlayer from '@/app/_components/VideoPlayer/VideoPlayer';

const FootagePreview = ()=>{
    return(
        <div className={`w-full h-full flex gap-[2vw] py-[4vh] ${styles.footagePreview}`}>
            <div className="w-1/2">
                <ArticlePreview height="h-[75vh]" withEdit={false} yourNewArticle={false}/>
            </div>
            <div className="w-1/2 flex flex-col gap-[1vw]">
              <div className="flex justify-between">
              <h3>Footage Found</h3>
              <SimplePagination/>
              </div>
              <div className="flex gap-[0.6vw]">
                <div className={`${styles.box} h-[12vh] w-1/3`}>
                    <div className={`${styles.movedCheckbox} `}>
                    <CustomCheckBox value=''/>
                    </div>
                    <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'/>
                </div>
                <div className={`${styles.box} h-[12vh] w-1/3`}>
                    <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'/>
                </div>
                <div className={`${styles.box} h-[12vh] w-1/3`}>
                    <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'/>
                </div>
              </div>

            </div>

        </div>
    )
}

export default FootagePreview