import styles from './choose-content.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import CustomSelectInput from '../../_components/CustomSelectInput/CustomSelectInput'

const ChooseContent = () => {

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

      <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] m-auto h-full ">
        <label className={styles.select_label}>Select Content Type</label>
        <CustomSelectInput label="Select Content Type" options={options} />
      </div>


      <div className="flex justify-between items-center">
        <CustomBtn word="Back" btnColor="white" href="/content-creator/choose-brand" />
        <CustomBtn word="Next" btnColor="black" href="/content-creator/working-on-article" />
      </div>

    </div>
  )
}

export default ChooseContent
