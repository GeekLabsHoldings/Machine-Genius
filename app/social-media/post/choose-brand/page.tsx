'use client' // Indicate that this component is intended for client-side rendering
import CustomBtn from '@/app/_components/Button/CustomBtn' // Custom button component
import styles from './ChooseBrand.module.css' // Stylesheet for ChooseBrand component
import CustomSelectInput from '../../../_components/CustomSelectInput/CustomSelectInput' // Custom select input component
import { useEffect, useState } from 'react' // Importing useEffect and useState hooks from React
import { useRouter } from 'next/navigation' // Importing useRouter hook from Next.js

// ChooseBrand component
const ChooseBrand = () => {

  // State to store the selected value from custom select
  const [SelectedValue, setSelectedValue] = useState<string | number>('')

  // Function to update the selected value
  const getValue = (value: string | number) => {
    setSelectedValue(value)
  }

  // Router instance
  const router = useRouter()

  // Options for the select input
  const options = [
    "PST",
    "Street Politics",
    "Movie Myth",
    "Investorcracy",
    "Mega Projects",
    "PST Canada"
  ]

  // useEffect hook to perform side effects when the SelectedValue changes
  useEffect(() => {
    console.log(SelectedValue);

    // Navigate to the appropriate page based on the selected brand
    // Example:
    // if (SelectedValue === 'Movie Myth') {
    //   router.push('/content-creator/create/movie-myth')
    // }

  }, [SelectedValue])

  return (
    <div className="flex flex-col h-full">

      {/* Select input to choose the brand */}
      <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] ">
        <label className={styles.select_label}>For This Brand</label>
        {/* Custom select input component */}
        <CustomSelectInput label="For This Brand" options={options} getValue={getValue} />
      </div>

      {/* Buttons to navigate */}
      <div className="flex justify-between items-center">
        {/* Button to navigate back */}
        <CustomBtn word="Back" btnColor="white" href="/social-media/post" />
        {/* Button to navigate to the next page */}
        <CustomBtn word="Next" btnColor="black" href="/social-media/post/choose-sub-brand" />
      </div>
    </div>
  )
}

export default ChooseBrand