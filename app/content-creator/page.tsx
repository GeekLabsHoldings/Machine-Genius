
import CustomSelectInput from "../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../_components/Button/CustomBtn";

import styles from './contentCreator.module.css'


const options = [
  "PST",
  "Street Politics",
  "Movie Myth",
  "Investorcracy",
  "Mega Projects",
  "PST Canada"
]



const contentCreator = () => {
  return (
    <div className="flex flex-col h-full">

      {/* <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center w-[30vw] m-auto h-full">
        <label className={styles.select_label}>I am writing a</label>
        <CustomSelectInput label="Select Content Type" options={options} />
      </div>


      <div className="flex justify-between items-center">
      <CustomBtn word="test" icon={ReloadIcon} btnColor="white" />
      </div> */}
      <div className="flex justify-end items-center">
        <CustomBtn word="Next"  btnColor="black" href="content-creator/choose-brand" />
      </div>

      {/* <TopicColapse title="Canada Hates People" date="April 16th 2024">
        <div className="space-y-[1.5vw]">
          <ArticleWithChecked article="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" />
          <ArticleWithChecked article="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" />
          <ArticleWithChecked article="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" />
          <ArticleWithChecked article="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" />
        </div>
      </TopicColapse> */}
      {/* <CustomBtn word="test" icon={ReloadIcon} btnColor="white" /> */}

    {/* </div> */}
    </div>
  );
};

export default contentCreator;
