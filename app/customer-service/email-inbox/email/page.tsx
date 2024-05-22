"use client";

import OptionsDropdown from "@/app/_components/OptionsDropdown/OptionsDropdown";
import styles from "./email.module.css";
import { useRouter } from "next/navigation";
import CustomBtn from "@/app/_components/Button/CustomBtn";

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

function page() {
  const router = useRouter();

  return (
    <div className="h-[85vh] py-[1.5vw]">
      <header>
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
          <OptionsDropdown
            icon={files}
            options={["Option 1", "Option 2", "Option 3"]}
          />
        </div>
      </header>
      <div className="w-full flex justify-end mt-4">
        <CustomBtn word="Reply" btnColor="black" href="/customer-service/email-inbox/email/reply" />
      </div>
      <div className="p-8 text-xl">
        <div className="mb-11">
          <p>Dear Customer Service Team,</p>

          <p className="mt-4">
            I hope this email finds you well. I am reaching out to seek
            assistance with my account on your platform. Recently, I've
            encountered difficulties accessing my account. When attempting to
            log in, I receive an error message stating that my password is
            incorrect, despite entering the correct credentials. I've tried
            resetting my password multiple times, but I'm still unable to access
            my account.
          </p>

          <p className="mt-4">
            Could you please look into this matter at your earliest convenience
            and provide guidance on how it can be resolved? <br />
            Here are my account details for your reference:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>
              Username: JohnDoe123
            </li>
            <li>
              Email associated with the account:
              johndoe@email.com
            </li>
          </ul>

          <p className="mt-4">
            I haven't made any recent transactions or changes to my account, and
            this issue has left me unable to access important features and
            information on your platform. <br /> I appreciate your prompt attention to
            this matter. If you require any further information from my end,
            please do not hesitate to ask.
          </p>

          <p className="mt-4">Thank you for your assistance and support.</p>
        </div>

        <div className="mt-3">
          <p>
            Warm regards, <br />
            John Doe johndoe@email.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
