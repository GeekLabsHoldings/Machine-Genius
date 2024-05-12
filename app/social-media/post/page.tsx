
import CustomSelectInput from "../../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../../_components/Button/CustomBtn";
import styles from "./Post.module.css";

const options = [
  "Facebook",
  "Raddit",
  "Telegram",
  "Twitter",
]

const Post = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* writing type select */}
          <label className={styles.select_label}>I am creating a post on </label>
          <CustomSelectInput label="select option " options={options} />
        </div>

      {/* buttons to move to last or next page */}
        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Next"
            btnColor="black"
            href="post/choose-brand"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;