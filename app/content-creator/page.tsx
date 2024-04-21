import CustomSelectInput from "../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../_components/Button/CustomBtn";

import styles from "./contentCreator.module.css";

const options = [
  "PST",
  "Street Politics",
  "Movie Myth",
  "Investorcracy",
  "Mega Projects",
  "PST Canada",
];

const contentCreator = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] m-auto h-full">
          <label className={styles.select_label}>I am writing a</label>
          <CustomSelectInput label="Select Content Type" options={options} />
        </div>

        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Next"
            btnColor="black"
            href="content-creator/choose-brand"
          />
        </div>
      </div>
    </div>
  );
};

export default contentCreator;
