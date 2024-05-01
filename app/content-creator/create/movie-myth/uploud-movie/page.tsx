'use client'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './uploadMovie.module.css'
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'

const ChooseBrand = () => {


  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleNavigate = () => {

    setIsLoading(true)

    setTimeout(() => {
      // Your action here
      router.push('/content-creator/create/movie-myth/create-movie')

    }, 1500); // 3000 milliseconds = 3 seconds

  }



  return (


    <div className="flex flex-col h-full">


      {IsLoading ? <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] py-[2vw] m-auto h-full">
        <LogoAndTitle needTxt={true} textNeeded='Hold on tight.' title='Genius is working on your article..' />
      </div> : <div className={"flex justify-center items-center w-[40vw] min-w-[30rem] py-[2vw] m-auto h-full " + styles.uploud_movie}>
        <input type="text" />
        <CustomBtn btnColor="black" word='Uploud' onClick={handleNavigate} />
      </div>}
      <div className="flex justify-start items-center">
        <CustomBtn word="Back" btnColor="white" href="/content-creator/create/choose-brand" />
      </div>
    </div>
  )
}

export default ChooseBrand
