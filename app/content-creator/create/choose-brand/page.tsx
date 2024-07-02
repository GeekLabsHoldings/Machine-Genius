'use client'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './ChooseBrand.module.css'
import CustomSelectInput from '../../../_components/CustomSelectInput/CustomSelectInput'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ChooseBrand = () => {

  // selected option from custom select
  const [SelectedValue, setSelectedValue] = useState<string | number>('')

  // function that get select value by sending to custom select as a prop
  const getValue = (value: string | number) => {
    setSelectedValue(value)
  }

  const router = useRouter()

  // select options 
  const options = [
    "PST USA",
    "PST Canada",
    "Movie Myth",
    "Investorcracy",
    "Mega Projects",
  ]

  useEffect(() => {

    console.log(SelectedValue);

    // navigate to movie myth if user select movie myth option 
    if (SelectedValue === 'Movie Myth') {
      router.push('/content-creator/create/movie-myth')
    }

  }, [SelectedValue])





  return (
    <div className="flex flex-col h-full">

      {/* chhose brand select */}
      <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] ">
        <label className={styles.select_label}>For This Brand</label>
        <CustomSelectInput label="Select Content Type" options={options} getValue={getValue} />
      </div>


      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn word="Back" btnColor="white" href="/content-creator/create" />
        <CustomBtn word="Next" btnColor="black" href="/content-creator/create/choose-content" />
      </div>

    </div>
  )
}

export default ChooseBrand
