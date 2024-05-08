'use client'
import ArticlePreview from '@/app/_components/ArticlePreview/ArticlePreview'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './show-errors.module.css'
import ErrorCollapse from '@/app/_components/ErrorCollapse/ErrorCollapse'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'
// import SpecificChecker from '@/app/_components/SpecificChecker/SpecificChecker'


// page that displays the errors in the article 
const ShowErrors = () => {

    // const [IsLoading, setIsLoading] = useState(false);

    // const router = useRouter()

    // const handleNavigate = () => {

    //     // setIsLoading(true)

    //     //   setTimeout(() => {
    //     //     // Your action here
    //     //     router.push('/content-creator/create/movie-myth')

    //     //   }, 1500); // 3000 milliseconds = 3 seconds

    // }

    return (
        <>

            <div className="flex flex-col ">

                    <div className="flex justify-center items-start h-[75vh] py-[1.5vw] gap-[2rem]">
                        <div className={'w-3/5 h-full'}>
                            <ArticlePreview yourNewArticle={true} height="h-full" withEdit={true} />
                        </div>
                        <div className={styles.scripts_wrapper + ' w-2/5'}>
                            <div className={styles.header}>
                                <h6>Errors</h6>
                                <h6>(3)</h6>
                            </div>
                            <div className={styles.select_article_container}>
                                <ErrorCollapse title='Canada Loves People' >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                                </ErrorCollapse>
                                <ErrorCollapse title='Canada Loves People' >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                                </ErrorCollapse>
                                <ErrorCollapse title='Canada Loves People' >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                                </ErrorCollapse>
                                <ErrorCollapse title='Canada Loves People' >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                                </ErrorCollapse>
                                <ErrorCollapse title='Canada Loves People' >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                                </ErrorCollapse>
                                <ErrorCollapse title='Canada Loves People' >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque doloribus ratione non similique velit modi eum repudiandae, nam saepe amet quaerat quasi placeat, dolore molestiae magnam iure earum ipsam. Soluta.
                                </ErrorCollapse>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between w-full">
                        <CustomBtn word={"Back"} btnColor="white" href="/content-creator/create/movie-myth/final-article" />
                        <CustomBtn word={"Fix & Check"} btnColor="black" href='/content-creator/create/movie-myth/article-ready' />
                    </div>


            </div>
        </>
    )
}

export default ShowErrors
