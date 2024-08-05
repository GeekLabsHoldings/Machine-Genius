import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "@/app/newsletter/settings/settings.module.css";

const ReGenerateIcon = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
      fill="#FFFFFB"
    />
  </svg>
);

const serverData = [
  { ipAddress: "199.137.247.252", server: "Server 1" },
  { ipAddress: "35.17.24.112", server: "Server 2" },
  { ipAddress: "78.48.142.16", server: "Server 3" },
  { ipAddress: "175.89.209.23", server: "Server 4" },
  { ipAddress: "26.115.228.8", server: "Server 5" },
  { ipAddress: "26.115.228.8", server: "Server 6" },
];

function Page() {
  return (
    <div className="flex flex-col">
      {/* titles wrapper */}
      {/* generated titles container */}
      <div className="flex flex-col gap-1 w-full overflow-clip py-[1.5vw]">
        <div className="flex justify-center grow gap-[5vw]">
          {/* scripts wrapper */}
          <div className={styles.scripts_wrapper + " w-1/2 py-5"}>
            {/* scripts header that  */}
            <h2 className="text-2xl font-bold">SMTP Email Servers Setup</h2>

            <div className={`flex flex-col gap-[0.2vw] mt-9`}>
              <h3 className="font-bold text-xl">Server List</h3>
              <div
                className={`${styles.titles_container} mt-4 w-full max-h-52 aspect-video`}
              ></div>
            </div>

            {/* topics container */}
            <div className={`flex flex-col w-[70%] gap-[0.8vw] mt-9`}>
              <h3 className="font-bold text-xl">Add New Server</h3>
              <div className={`flex flex-col gap-[0.2vw]`}>
                <label
                  htmlFor="tiketDescription"
                  className="font-[600] text-xl"
                >
                  Server Name*
                </label>
                <input
                  type="text"
                  id="subjectLine"
                  required
                  className={`${styles.input}`}
                />
              </div>

              <div className={`flex flex-col mt-5 gap-[0.5vw]`}>
                <label
                  htmlFor="tiketDescription"
                  className="font-[600] text-xl"
                >
                  Assigned Brand
                </label>
                <CustomSelectInput
                  options={["8:30 PM GMT", "9:00 PM GMT", "9:30 PM GMT"]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-[2vw]">
              <div className="flex justify-end mt-1">
                {/* regenerate titles button */}

                <CustomBtn
                  word="Run IP Warmup Campaign"
                  btnColor="black"
                  icon={ReGenerateIcon}
                  paddingVal="py-2 px-4"
                />
              </div>
            </div>
          </div>

          {/* preview wrapper */}
          <div className={styles.scripts_wrapper + " w-1/2 py-5"}>
            {/* scripts header that  */}
            <h2 className="text-2xl font-bold">Replace IP</h2>

            <div className={`flex flex-col gap-[0.2vw] mt-9`}>
              <h3 className="font-bold text-xl">Select IP</h3>
              <div className={`${styles.titles_container} mt-4 w-full`}>
                <header>
                  <div className="flex text-center py-3">
                    <span className="w-1/2 font-bold">IP Address</span>
                    <span className="w-1/2 font-bold">Server</span>
                  </div>
                </header>
                <div className="max-h-52 overflow-y-auto">
                  {serverData.map((data) => (
                    <div
                      className="flex text-center py-3 hover:bg-[#E1C655] hover:text-[#fffffb] hover:font-bold"
                      key={data.ipAddress}
                    >
                      <span className="w-1/2">{data.ipAddress}</span>
                      <span className="w-1/2">{data.server}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* topics container */}
            <div className={`flex flex-col gap-[0.8vw] mt-9`}>
              <div className={`flex flex-col gap-[0.2vw]`}>
                <label
                  htmlFor="tiketDescription"
                  className="font-[600] text-xl"
                >
                  Selected IP
                </label>
                <input
                  type="text"
                  id="subjectLine"
                  required
                  className={`${styles.input}`}
                />
              </div>

              <div className={`flex flex-col mt-5 gap-[0.5vw]`}>
                <label
                  htmlFor="tiketDescription"
                  className="font-[600] text-xl"
                >
                  Replaced by{" "}
                </label>
                <input
                  type="text"
                  id="subjectLine"
                  required
                  className={`${styles.input}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-[2vw]">
              <div className="flex justify-end mt-1">
                {/* regenerate titles button */}

                <CustomBtn
                  word="Replace IP"
                  btnColor="black"
                  paddingVal="py-2 px-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
