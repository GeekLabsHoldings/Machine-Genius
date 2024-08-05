'use client'
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import styles from "@/app/newsletter/create/newsletter-subjectline/newsletter-subjectline.module.css";
import { useState } from "react";

// const ReGenerateIcon = (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" fill="none">
//     <path
//       d="M0.754732 6.49635C0.310457 6.55953 0.00154495 6.97089 0.0646763 7.41516C0.257889 8.77361 0.876039 10.0362 1.83056 11.0219C2.78517 12.0075 4.02716 12.6659 5.37876 12.9026C6.73034 13.1392 8.12216 12.9421 9.35487 12.3394C9.64191 12.1991 9.91688 12.0385 10.178 11.8593C10.622 11.5546 11.2322 11.5579 11.613 11.9387C12.1248 12.4506 13 12.088 13 11.3642V9.12498C13 8.57269 12.5523 8.12498 12 8.12498H9.76078C9.03693 8.12498 8.67441 9.00013 9.18626 9.51201C9.50975 9.83548 9.49955 10.3701 9.11337 10.6153C8.96152 10.7117 8.80392 10.8 8.64114 10.8796C7.71661 11.3316 6.67275 11.4794 5.65905 11.3019C4.64539 11.1244 3.71386 10.6307 2.99796 9.89137C2.28199 9.15207 1.81838 8.20527 1.67351 7.18636C1.61029 6.7421 1.19893 6.43317 0.754732 6.49635ZM3.64512 0.660543C3.35608 0.801857 3.07927 0.963766 2.81654 1.14447C2.37444 1.44855 1.76644 1.44537 1.38702 1.06594C0.875144 0.554093 0 0.916605 0 1.64047V3.875C0 4.42729 0.447716 4.875 1 4.875H3.23456C3.95842 4.875 4.32096 3.99983 3.80908 3.48799C3.48674 3.16564 3.49674 2.63303 3.88124 2.38813C4.03473 2.29037 4.19413 2.20093 4.35882 2.1204C5.2834 1.6684 6.32725 1.52056 7.34095 1.69807C8.35464 1.87558 9.28615 2.36934 10.0021 3.10861C10.718 3.84788 11.1816 4.79476 11.3265 5.81363C11.3897 6.25789 11.801 6.56681 12.2453 6.50363C12.6896 6.44045 12.9985 6.02909 12.9353 5.58483C12.7421 4.22635 12.124 2.96385 11.1694 1.97815C10.2148 0.992452 8.97283 0.334114 7.62124 0.0974319C6.26966 -0.139249 4.87784 0.0578646 3.64512 0.660543Z"
//       fill="#FFFFFB"
//     />
//   </svg>
// );

function Page() {
  // state to handle content while page is loading its content
  const [IsLoading, setIsLoading] = useState(false);
  // to handle loading content before navigation to next page
  const handleNavigate = () => {
    setIsLoading(true);

    // setTimeout(() => {
    //   // Your action here
    //   router.push('/content-creator/create/generated-titles')

    // }, 1500); // 3000 milliseconds = 3 seconds
  };

  return (
    <>
      <div className="flex flex-col">
        {IsLoading ? (
          <div className="flex justify-center items-center h-[75vh] py-[1.5vw] w-full gap-[10vw] ">
            <div className="flex flex-col gap-[2vw]">
              <LogoAndTitle
                title={"Your NewsLetter Has Been Scheduled!"}
                needTxt={false}
              />
              <CustomBtn
                word="Dashboard"
                btnColor="black"
                href={"/newsletter/dashboard"}
                style={{ width: "max-content", margin: "auto" }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1 w-full overflow-clip h-[75vh] py-[1.5vw]">
              <h2 className="text-[2rem] font-bold">Scheduling</h2>
              <span>
                create compelling subject lines and captivating opening lines
                for your content
              </span>

              <div className="flex justify-center grow mt-[1vw] gap-[6vw]">
                {/* scripts wrapper */}
                <div className={styles.scripts_wrapper + " w-1/2 py-5"}>
                  {/* scripts header that  */}
                  {/* topics container */}
                  <span className="font-bold text-2xl">Scheduling</span>
                  <div className="flex flex-col gap-6 mt-[2vw]">
                    <div className={`flex flex-col gap-[0.2vw]`}>
                      <label
                        htmlFor="tiketDescription"
                        className="font-[600] text-xl"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="subjectLine"
                        required
                        className={`${styles.input}`}
                      />
                    </div>
                    <div className={`flex flex-col gap-[0.2vw]`}>
                      <label
                        htmlFor="tiketDescription"
                        className="font-[600] text-xl"
                      >
                        Subject Line
                      </label>
                      <input
                        type="text"
                        id="subjectLine"
                        required
                        className={`${styles.input}`}
                      />
                    </div>
                    <div className={`flex flex-col gap-[0.2vw]`}>
                      <label
                        htmlFor="tiketDescription"
                        className="font-[600] text-xl"
                      >
                        Opening Line
                      </label>
                      <input
                        type="text"
                        id="subjectLine"
                        required
                        className={`${styles.input}`}
                      />
                    </div>
                  </div>
                  <div className="w-[50%] min-w-56 mt-16">
                    <span className="block text-xl mb-5 font-bold">
                      Upload Time
                    </span>
                    <CustomSelectInput
                      options={["8:30 PM GMT", "9:00 PM GMT", "9:30 PM GMT"]}
                    />
                  </div>
                </div>

                {/* preview wrapper */}
                <div className={styles.scripts_wrapper + " w-1/2 py-5"}>
                  {/* scripts header that  */}
                  {/* topics container */}
                  <div className="min-w-56 mt-16">
                    <span className="block text-xl mb-5 font-bold">
                      Email List
                    </span>
                    <CustomSelectInput
                      options={["PST | Asia", "EST | Europe", "CST | Africa"]}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* create my own title wrapper */}
            {/* buttons to move to last or next page */}
            <div className="flex justify-between w-full">
              <CustomBtn
                word={"Back"}
                btnColor="white"
                href={"/newsletter/create/newsletter-subjectline"}
              />
              <CustomBtn
                word={"Next"}
                btnColor="black"
                onClick={handleNavigate}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Page;
