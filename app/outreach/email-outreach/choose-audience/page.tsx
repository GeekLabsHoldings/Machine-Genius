import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const options = [
  "Invvestocracy",
  "Invvestocracy 2",
  "Invvestocracy 3",
  "Invvestocracy 4",
];

const page = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col justify-center gap-12 items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
            {/* writing type select */}
            <h2 className="text-[2.5rem] font-bold">Choose your audience</h2>
            <CustomSelectInput label="Select Account" options={options} />
          </div>

          {/* buttons to move to last or next page */}
          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              href="/outreach/email-outreach/email-preview"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
