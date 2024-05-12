
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../../../_components/Button/CustomBtn";
import styles from './movie-myth.module.css'

const options = [
  "Script",
  "Article"
]

const MovieMyth = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          <label className={styles.select_label}>I am writing a</label>
          <CustomSelectInput label="Select Content Type" options={options} />
        </div>

        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Next"
            btnColor="black"
            href="/content-creator/create/movie-myth/choose-brand"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieMyth;
