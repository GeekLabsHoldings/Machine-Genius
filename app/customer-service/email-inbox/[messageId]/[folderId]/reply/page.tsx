"use client";
import OptionsDropdown from "@/app/_components/OptionsDropdown/OptionsDropdown";
import styles from "../email.module.css";
import styles1 from "./reply.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import CustomBtn from "@/app/_components/Button/CustomBtn";
// import { TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import "./reply.css";
import { toast } from "react-hot-toast";

interface ProfileImageFrameProps {
  reversed?: boolean;
}

function ProfileImageFrame({ reversed }: ProfileImageFrameProps) {
  return reversed ? (
    <div
      className={`[background-color:var(--dark)] shrink-0 flex items-center justify-center ${styles.chat__chat__aside__menu__profile} group-hover:[background-color:var(--white)]`}
    >
      {/* <img src="/images/profile.png" alt="profile" /> */}
    </div>
  ) : (
    <div
      className={`[background-color:var(--dark)] shrink-0 flex items-center justify-center ${styles.chat__chat__aside__menu__profile_reversed} group-hover:[background-color:var(--white)]`}
    >
      {/* <img src="/images/profile.png" alt="profile" /> */}
    </div>
  );
}

const files = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 10.7777V13.2C22 17.3483 22 19.4226 20.7112 20.7112C19.4226 22 17.3484 22 13.2 22H8.8C4.65166 22 2.57747 22 1.28873 20.7112C0.216975 19.6395 0.036531 18.0245 0.00614896 15.1251H9.56307L7.07731 16.9329C6.70882 17.2008 6.62736 17.7168 6.89534 18.0853C7.16333 18.4538 7.6793 18.5352 8.04779 18.2673L12.5853 14.9673C12.7987 14.8121 12.925 14.564 12.925 14.3001C12.925 14.0361 12.7987 13.7881 12.5853 13.6329L8.04779 10.3329C7.6793 10.0649 7.16333 10.1463 6.89534 10.5148C6.62736 10.8833 6.70882 11.3993 7.07731 11.6673L9.56307 13.4751H1.10149e-05L0 13.2L3.30448e-05 5.44473C3.30448e-05 4.47398 3.30527e-05 3.98853 0.0763181 3.58423C0.412137 1.80434 1.80436 0.412104 3.58425 0.076285C3.98857 7.86781e-09 4.47396 0 5.44475 0C5.87008 0 6.08276 0 6.28715 0.019118C7.16834 0.101519 8.00419 0.447744 8.68556 1.01256C8.84356 1.14357 8.99393 1.29396 9.29478 1.59473L9.9 2.2C10.7974 3.09736 11.2461 3.54604 11.7833 3.84497C12.0786 4.00918 12.3916 4.13886 12.7164 4.23146C13.3077 4.4 13.9423 4.4 15.2112 4.4H15.6223C18.518 4.4 19.9658 4.4 20.9068 5.24641C20.9934 5.32426 21.0758 5.40665 21.1537 5.49321C22 6.43429 22 7.88209 22 10.7777Z"
      fill="#2A2B2A"
    />
  </svg>
);

function Page({ params }: { params: { messageId: string; folderId: string } }) {
  const router = useRouter();
  const brand = useSearchParams().get("brand");
  console.log(brand);
  const [text, setText] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [emailDetails, setEmailDetails] = useState<any>(null);
  const [textValue, setTextValue] = useState("");
  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  async function sendEmail() {
    console.log(toAddress, subject, text, params.messageId, brand);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-service/email/replay-email?brand=${brand}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          toAddress,
          subject,
          content: text,
          emailId: params.messageId,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status.description === "success") {
      toast.success("Email sent successfully");
      router.push(`/customer-service/email-inbox`);
    } else {
      toast.error("Failed to send email");
    }
  }
  async function getEmailDetails() {
    console.log(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-service/email/email-by-id/${params.messageId}/${params.folderId}?brand=${brand}`
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-service/email/email-by-id/${params.messageId}/${params.folderId}?brand=${brand}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);
    setEmailDetails(data);
    setToAddress(data?.header?.sender);
    document.querySelector(".emailContent")!.innerHTML = data?.content;
  }

  useEffect(() => {
    getEmailDetails();
  }, []);

  return (
    <div className={`${styles.reply__container} h-[85vh] py-[1.5vw]`}>
      <div
        className={`absolute inset-0 z-[2] ${isExpanded ? "block" : "hidden"} ${
          styles.overlay
        }`}
      ></div>
      <header className={styles.email__header}>
        <div
          className={`flex items-center justify-between ${styles.email__title}`}
        >
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => router.back()}
          >
            <svg
              width="11"
              height="22"
              viewBox="0 0 11 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z"
                fill="#2A2B2A"
              />
            </svg>
            <h2 className="text-[2rem] w-max font-bold"> Issues with Brand </h2>
          </div>

          <div className={styles1.replyDropdown}>
            <OptionsDropdown
              icon={files}
              options={["Send To Sales Team", "Escalate To Manager"]}
              openIndecator
            />
          </div>
        </div>
      </header>
      <div
        className={`relative flex flex-col overflow-y-hidden ${
          isExpanded ? "justify-end" : ""
        } w-full h-[90%] mt-9 text-xl`}
      >
        <div
          className={`flex gap-4 top-0 overflow-y-hidden ${
            isExpanded ? "absolute z-[1]" : ""
          }`}
        >
          <ProfileImageFrame reversed />
          <div
            className={`mb-6 ${styles.container__shadow} w-full max-h-[30vh] overflow-y-auto`}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4 [border-color:var(--dark)]">
              <div>
                <span className="font-bold">From: </span>
                <span className="ml-5"> {emailDetails?.header?.sender}</span>
              </div>
            </div>
            <div className="text-base emailContent"></div>
          </div>
        </div>
        <div
          className={`relative z-[3] flex hrow w-full gap-4 ${
            isExpanded ? "grow max-h-[90%]" : ""
          }`}
        >
          <ProfileImageFrame reversed />
          <div
            className={` flex flex-col grow ${styles.container__shadow} [background-color:var(--white)]`}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4 [border-color:var(--dark)]">
              <div className="flex flex-col gap-y-[--10px]">
              <div>
                <span className="font-bold">To: </span>
                <span
                  className="ml-5 rounded-[5px] text-base bg-[#2A2B2A0F] px-2 py-0.5 focus:outline-none outline-none"
                >{emailDetails?.header?.sender}</span>
              </div>
              <div>
                <span className="font-bold">Subject: </span>
                <input
                  type="text"
                  className="ml-5 rounded-[5px] text-base bg-[#2A2B2A0F] px-2 py-0.5 focus:outline-none outline-none"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              </div>
              <button
                onClick={() => {
                  console.log("clicked");
                  setIsExpanded((prev) => !prev);
                }}
                className={isExpanded ? "rotate-180" : ""}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1.11111V18.8889C0 19.1836 0.117063 19.4662 0.325437 19.6746C0.533811 19.8829 0.816426 20 1.11111 20H18.8889C19.1836 20 19.4662 19.8829 19.6746 19.6746C19.8829 19.4662 20 19.1836 20 18.8889V1.11111C20 0.816426 19.8829 0.533811 19.6746 0.325437C19.4662 0.117063 19.1836 0 18.8889 0H1.11111C0.816426 0 0.533811 0.117063 0.325437 0.325437C0.117063 0.533811 0 0.816426 0 1.11111ZM2.22222 2.22222H17.7778V17.7778H7.77778V13.3333C7.77778 13.0386 7.66071 12.756 7.45234 12.5477C7.24397 12.3393 6.96135 12.2222 6.66667 12.2222H2.22222V2.22222ZM9.21445 10.7856C9.00614 10.5772 8.88913 10.2946 8.88913 10C8.88913 9.70537 9.00614 9.42281 9.21445 9.21445L12.3178 6.11111H11.1111C10.8164 6.11111 10.5338 5.99405 10.3254 5.78567C10.1171 5.5773 10 5.29469 10 5C10 4.70532 10.1171 4.4227 10.3254 4.21433C10.5338 4.00595 10.8164 3.88889 11.1111 3.88889H15C15.1457 3.88958 15.2899 3.91864 15.4244 3.97444C15.6275 4.05836 15.8011 4.20057 15.9233 4.38311C16.0455 4.56565 16.1109 4.78032 16.1111 5V8.88889C16.1111 9.18357 15.9941 9.46619 15.7857 9.67456C15.5773 9.88294 15.2947 10 15 10C14.7053 10 14.4227 9.88294 14.2143 9.67456C14.006 9.46619 13.8889 9.18357 13.8889 8.88889V7.68222L10.7856 10.7856C10.5772 10.9939 10.2946 11.1109 10 11.1109C9.70537 11.1109 9.42281 10.9939 9.21445 10.7856Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full flex flex-col h-full gap-[1vw]">
              {/* <TextareaAutosize
                className="w-full text-base p-2 resize-none focus:outline-none h-full mb-20"
                minRows={isExpanded ? 17 : 1}
                placeholder="Type your reply here..."
                maxRows={isExpanded ? 17 : 5}
              /> */}
              {isExpanded ? (
                <Editor
                  value={text}
                  onTextChange={(e) => {
                    setText(e.htmlValue || "");
                    const plainText = stripHtmlTags(e.htmlValue || "");
                    setTextValue(plainText); // Set the plain text to the state
                  }}
                  style={{ height: "320px" }}
                />
              ) : (
                <textarea
                  className="w-full text-base p-2 resize-none outline-none h-full"
                  placeholder="Type your reply here..."
                  rows={isExpanded ? 17 : 1}
                  value={textValue}
                  onClick={() => setIsExpanded(true)}
                />
              )}

              {/* <div className="absolute bottom-0 inset-x-0"> */}
              <div className="flex border-t pt-4 [border-color:var(--dark)]">
                <CustomBtn
                  word="Reply"
                  btnColor="black"
                  paddingVal="py-[--10px] px-[--42px]"
                  onClick={sendEmail}
                />
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
