'use client'
import { VideosTemplates } from '@/app/_data/data';
import styles from './video-templates.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn';
const VideoTemplates = () => {
    // return video types based on the brand
    const renderVideoTypes = VideosTemplates.map((brandAndType) => (
        <div className={`${styles.secRow} flex justify-around`}>
            <h4 className='w-1/3 text-center'>{brandAndType.brand}</h4>
            <div className='w-1/3 text-center'>
                {brandAndType.videoTypes.map((type) => (
                    <p>{type}</p>
                ))}
            </div>
        </div>
    ))
    
    return (
        <div className="w-full h-full flex flex-col pt-[1vw] pageHeader">
            <h3>Choose a template for your video.</h3>
            <div className='flex gap-[2vw] h-[70vh] py-[1.5vw]'>
                <div className="w-1/3">
                    <div className={styles.brandsAndTypes}>
                        <div className={`${styles.secHeader} flex justify-around`}>
                            <h4 className='w-1/3 text-center'>Brand</h4>
                            <h4 className='w-1/3 text-center'>Video Type</h4>
                        </div>

                        <div className={styles.secBody}>
                            <div className={styles.brandsAndTypesWrapper}>
                                {renderVideoTypes}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-2/3">
                    <div className={styles.brandsAndTypes}>
                        <div className={styles.templatesWrapper}>
                            <h3>Templates</h3>
                            <div className={styles.thumbnailContainer}>
                                <div className={styles.thumbnailWrapper}></div>
                            </div>
                            <h3>Instructions</h3>
                            <p className='w-10/12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>

                    </div>

                </div>
            </div>
            {/* buttons lead to last or next page */}
            <div className='flex justify-between'>
                <CustomBtn word='Back' btnColor={'white'} href='/video-editor/create/converted-article' />
                <CustomBtn word='Use Template' btnColor='black' href='/video-editor/create/footage-preview' />
            </div>



        </div>
    )
}

export default VideoTemplates