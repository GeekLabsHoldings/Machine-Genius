import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './ChooseBrand.module.css'
import CustomSelectInput from '../../_components/CustomSelectInput/CustomSelectInput'

const ChooseBrand = () => {


    const options = [
        "PST",
        "Street Politics",
        "Movie Myth",
        "Investorcracy",
        "Mega Projects",
        "PST Canada"
      ]




  return (
    <div className="flex flex-col h-full">

      <div className="flex flex-col justify-center items-center w-[30vw] m-auto h-full ">
        <label className={styles.select_label}>For This Brand</label>
        <CustomSelectInput label="Select Content Type" options={options} />
      </div>


      <div className="flex justify-between items-center">
        <CustomBtn word="Back" btnColor="white" href="/content-creator" />
        <CustomBtn word="Next" btnColor="black" href="/content-creator/choose-content" />
      </div>

    </div>
  )
}

export default ChooseBrand
