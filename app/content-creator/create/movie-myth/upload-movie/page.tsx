'use client'
import styles from './upload-movie.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import CustomSelectInput from '../../../../_components/CustomSelectInput/CustomSelectInput'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'

const ChooseContent = () => {
// state to handle content while page is loading its content
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();

// show loading page before navigate to next page
  const handleNavigate = () => {
      setIsLoading(true)
      setTimeout(() => {
        router.push('/content-creator/create/movie-myth/create-movie')
    }, 1500);
  }

    const options = [
        "Script",
        "Article",
        "Documentary",
        "Trends Article"
      ]

  return (
    <div className="flex flex-col">
 {/* check on loading state to render the correct content based on it */}
      {IsLoading ? <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
                <LogoAndTitle needTxt={true} textNeeded='Hold on tight.' title='Genius is working on your article..'/>
            </div> : <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
        <label className={styles.select_label}>Upload Movie</label>
        <CustomSelectInput label="Spider Man New Gen" options={options}  />
      </div>}

{/* buttons to lead you to last and next page */}
      <div className="flex justify-between items-center">
        <CustomBtn word="Back" btnColor="white" href="/content-creator/create/movie-myth/choose-brand"/>
        <CustomBtn word="Next" btnColor="black" onClick={handleNavigate} />
      </div>

    </div>
  )
}

export default ChooseContent
