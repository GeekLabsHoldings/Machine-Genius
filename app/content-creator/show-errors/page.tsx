import ArticlePreview from '@/app/_components/ArticlePreview/ArticlePreview'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './show-errors.module.css'
import TopicColapse from '@/app/_components/TopicCollapse/TopicCollapse'
import ArticleWithCheck from '@/app/_components/ArticleWithCheck/ArticleWithCheck'
import ErrorCollapse from '@/app/_components/ErrorCollapse/ErrorCollapse'

const ShowErrors = () => {
    return (
        <>

            <div className="flex flex-col h-full">
                <div className="flex justify-center items-start py-[2vw] h-[90%] gap-[2rem]">
                    <div className={'w-3/5 h-full'}>

                        <ArticlePreview height="h-full" withEdit={true} />
                    </div>
                    <div className={styles.scripts_wrapper + ' w-2/5'}>
                        <div className={styles.header}>
                            <h6>Errors</h6>
                            <h6>(3)</h6>
                        </div>
                        <div className={styles.select_article_container}>
                            <ErrorCollapse title='Canada Hates People' >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                            </ErrorCollapse>
                            <ErrorCollapse title='Canada Hates People' >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                            </ErrorCollapse>
                            <ErrorCollapse title='Canada Hates People' >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                            </ErrorCollapse>
                            <ErrorCollapse title='Canada Hates People' >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                            </ErrorCollapse>
                            <ErrorCollapse title='Canada Hates People' >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                            </ErrorCollapse>
                            <ErrorCollapse title='Canada Hates People' >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                            </ErrorCollapse>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full">
                    <CustomBtn word={"Back"} btnColor="white" href="/content-creator/final-article" />
                    <CustomBtn word={"Next"} btnColor="black" href="/content-creator/checker-after-solve-errors" />
                </div>
            </div>
        </>
    )
}

export default ShowErrors
