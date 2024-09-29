import CustomSelectInput from "../../_components/CustomSelectInput/CustomSelectInput"; // Custom select input component
import CustomBtn from "../../_components/Button/CustomBtn"; // Custom button component

// Options for post creation type
const platformsOptions = [
  "Facebook",
  "Raddit",
  "Telegram",
  "Twitter",
  "LinkedIn",
  "Youtube",
  "Instagram",
];

// Post component
const Post = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        {/* Container for post creation */}
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* Label for selecting post creation type */}
          <label className="text-[--40px] text-center font-bold leading-normal w-full pb-[--sy-29px]">I am creating a post on</label>
          {/* Custom select input for selecting post creation type */}
          <CustomSelectInput
            label="Select Platform"
            options={platformsOptions}
            hoverColor="hover:bg-[#E1C655]"
          />
        </div>

        {/* Buttons to navigate */}
        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Next" // Button text
            btnColor="black" // Button color
            href="/social-media/post-creation/select-brand" // Navigation link
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
