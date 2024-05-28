import styles from "./choose-template.module.css"
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";


const page = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col gap-12 items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] outline">
            <h2 className="text-[2.5rem] font-bold">Choose a Template</h2>
            <div className="flex gap-6 h-full outline">
              <div
                className={`flex flex-col p-6 ${styles.box__shadow} border border-gray-300 rounded-[20px] h-[60vh]`}
              >
                <h3 className="text-xl font-bold border-b border-[var(--dark)] pb-5">
                  Templates
                </h3>
                <div className={`flex flex-col gap-6 h-full overflow-y-auto py-5`}>
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`flex flex-col gap-2 p-[22px] rounded-[20px] border border-gray-300 ${styles.box__shadow} hover:bg-[var(--dark)] hover:text-white cursor-pointer`}
                      >
                        <span className="font-bold">
                          Syndication reach-out email
                        </span>
                        <span>(indirect)</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* buttons to move to last or next page */}
          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              href="/outreach/social-media-outreach/choose-audience"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
