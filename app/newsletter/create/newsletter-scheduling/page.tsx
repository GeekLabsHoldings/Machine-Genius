"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import styles from "@/app/newsletter/create/newsletter-subjectline/newsletter-subjectline.module.css";
import { useContext, useEffect, useState } from "react";
import { createNewsletterContext } from "../_context/createNewsletterContext";

function Page() {
  // state to handle content while page is loading its content
  const [IsLoading, setIsLoading] = useState(false);
  // to handle loading content before navigation to next page
  const [brands, setBrands] = useState<any>([]);

  const {
    selectedContentTitle,
    setSelectedContentTitle,
    generalTitles,
    openingLine,
    subjectLine,
    setSubjectLine,
    setOpeningLine,
    selectedBrand,
  } = useContext(createNewsletterContext);

  const [brandId, setBrandId] = useState<any>("");

  const getBrands = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/brand/get-all-brands?limit=999`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `barrer ${token}`,
        },
      }
    );
    const json = await res.json();
    console.log(json);
    setBrands(json);
  };

  useEffect(() => {
    getBrands();
  }, []);

  const handleSchedule = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/news-letter/send-newsletter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: selectedContentTitle,
          subjectLine: subjectLine,
          openingLine: openingLine,
          articles: generalTitles,
          brand: brandId,
          uploadTime: 1726725120000,
        }),
      }
    );

    setIsLoading(true);
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
                        value={selectedContentTitle}
                        onClick={(e) =>
                          setSelectedContentTitle(
                            (e.target as HTMLInputElement).value
                          )
                        }
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
                        value={subjectLine}
                        onChange={(e) => setSubjectLine(e.target.value)}
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
                        value={openingLine}
                        onChange={(e) => setOpeningLine(e.target.value)}
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
                      options={brands?.map((brand: any) => brand.brand_name)}
                      getValue={(value: string | number) => {
                        setBrandId(
                          brands?.find((brand: any) => brand.brand_name === value)
                            ?._id || ""
                        );
                      }}
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
                word={"Schedule"}
                btnColor="black"
                onClick={handleSchedule}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Page;
