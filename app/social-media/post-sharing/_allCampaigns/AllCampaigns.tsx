import { useContext, useEffect, useState } from "react";
import styles from "./AllCampaigns.module.css";
import {
  runningClockIcon,
  pausedIcon,
  finishedCheckIcon,
} from "@/app/_utils/svgIcons";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import convertTimestampToDate from "@/app/_utils/convertTimestampToDate";

interface ICampaign {
  _id: string;
  content: string;
  platform: string;
  timestamp: number;
  engagment: number;
  posts_shared: number;
  brand: string;
  status: string;
  __v: number;
}

const AllCampaigns = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    fetchedCampaigns: ICampaign[];
  }>({
    fetchedCampaigns: [],
  });

  const getCampaigns = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/settings/get-campaigns`,
      {
        headers: {
          Authorization: `barrer ${
            typeof window !== "undefined"
              ? localStorage.getItem("token")
              : authState.token
          }`,
        },
      }
    );

    if (res.status === 401) {
      handleSignOut();
    }

    if (!res.ok) {
      toast.error("Failed to fetch campaigns!");
      return;
    }

    const data: ICampaign[] = await res.json();
    if (data && Array.isArray(data) && data.length > 0) {
      setPageState((prevState) => ({
        ...prevState,
        fetchedCampaigns: data,
      }));
    } else {
      toast.error("Failed to fetch campaigns!");
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div className="h-[77vh]">
      <div className={styles.database_table}>
        <ul className={styles.table_header}>
          <li className="w-[5%]">
            <span>#</span>
          </li>
          <li className="w-[35%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M0 3.33301H17.7778C19.0051 3.33301 20 4.32793 20 5.55523H0V3.33301Z"
                fill="#222222"
              />
              <path
                d="M0 7.77734H20V12.444C20 14.3109 20 15.2442 19.6367 15.9573C19.3171 16.5846 18.8072 17.0945 18.18 17.414C17.4669 17.7773 16.5336 17.7773 14.6667 17.7773H5.33333C3.46649 17.7773 2.53307 17.7773 1.82003 17.414C1.19282 17.0945 0.682889 16.5846 0.363311 15.9573C1.32455e-07 15.2442 0 14.3109 0 12.444V7.77734Z"
                fill="#222222"
              />
              <path
                d="M0 3.33333C0 2.29791 4.96705e-08 1.7802 0.169156 1.37181C0.3947 0.827311 0.827311 0.3947 1.37181 0.169155C1.7802 -2.15239e-07 2.29791 0 3.33333 0H5.93683C6.84517 0 7.29933 -2.15239e-07 7.70771 0.169155C8.11611 0.338311 8.43722 0.659455 9.07956 1.30174L11.1111 3.33333H0Z"
                fill="#222222"
              />
            </svg>
            <span>Content Name</span>
          </li>
          <li className="w-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.33333 12H10.6667V10.6667H9.33333V12ZM9.33333 17.3333H10.6667V16H9.33333V17.3333ZM14.6667 12H16V10.6667H14.6667V12ZM14.6667 17.3333H16V16H14.6667V17.3333ZM4 17.3333H5.33333V16H4V17.3333ZM18.6667 5.33333H1.33333V4C1.33333 3.264 1.93067 2.66667 2.66667 2.66667H5.33333V3.33333C5.33333 3.702 5.63133 4 6 4C6.36867 4 6.66667 3.702 6.66667 3.33333V2.66667H13.3333V3.33333C13.3333 3.702 13.6313 4 14 4C14.3687 4 14.6667 3.702 14.6667 3.33333V2.66667H17.3333C18.0693 2.66667 18.6667 3.264 18.6667 4V5.33333ZM17.3333 12C17.3333 12.736 16.736 13.3333 16 13.3333H14.6667C13.9307 13.3333 13.3333 12.736 13.3333 12V10.6667C13.3333 9.93067 13.9307 9.33333 14.6667 9.33333H16C16.736 9.33333 17.3333 9.93067 17.3333 10.6667V12ZM17.3333 17.3333C17.3333 18.0693 16.736 18.6667 16 18.6667H14.6667C13.9307 18.6667 13.3333 18.0693 13.3333 17.3333V16C13.3333 15.264 13.9307 14.6667 14.6667 14.6667H16C16.736 14.6667 17.3333 15.264 17.3333 16V17.3333ZM12 12C12 12.736 11.4027 13.3333 10.6667 13.3333H9.33333C8.59733 13.3333 8 12.736 8 12V10.6667C8 9.93067 8.59733 9.33333 9.33333 9.33333H10.6667C11.4027 9.33333 12 9.93067 12 10.6667V12ZM12 17.3333C12 18.0693 11.4027 18.6667 10.6667 18.6667H9.33333C8.59733 18.6667 8 18.0693 8 17.3333V16C8 15.264 8.59733 14.6667 9.33333 14.6667H10.6667C11.4027 14.6667 12 15.264 12 16V17.3333ZM6.66667 12C6.66667 12.736 6.06933 13.3333 5.33333 13.3333H4C3.264 13.3333 2.66667 12.736 2.66667 12V10.6667C2.66667 9.93067 3.264 9.33333 4 9.33333H5.33333C6.06933 9.33333 6.66667 9.93067 6.66667 10.6667V12ZM6.66667 17.3333C6.66667 18.0693 6.06933 18.6667 5.33333 18.6667H4C3.264 18.6667 2.66667 18.0693 2.66667 17.3333V16C2.66667 15.264 3.264 14.6667 4 14.6667H5.33333C6.06933 14.6667 6.66667 15.264 6.66667 16V17.3333ZM17.3333 1.33333H14.6667V0.666667C14.6667 0.298667 14.3687 0 14 0C13.6313 0 13.3333 0.298667 13.3333 0.666667V1.33333H6.66667V0.666667C6.66667 0.298667 6.36867 0 6 0C5.63133 0 5.33333 0.298667 5.33333 0.666667V1.33333H2.66667C1.194 1.33333 0 2.52733 0 4V18.6667C0 20.1393 1.194 21.3333 2.66667 21.3333H17.3333C18.806 21.3333 20 20.1393 20 18.6667V4C20 2.52733 18.806 1.33333 17.3333 1.33333ZM4 12H5.33333V10.6667H4V12Z"
                fill="#2A2B2A"
              />
            </svg>
            <span>Date Published</span>
          </li>
          <li className="w-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 14"
              fill="none"
            >
              <path
                d="M3.5 11V3C3.5 1.34315 2.15685 0 0.5 0C0.22386 0 0 0.22386 0 0.5V13.5C0 13.7761 0.22386 14 0.5 14C2.15685 14 3.5 12.6569 3.5 11Z"
                fill="#2A2B2A"
              />
              <path
                d="M10.5 0C12.3856 0 13.3284 2.28882e-07 13.9142 0.58579C14.5 1.17157 14.5 2.11438 14.5 4V10C14.5 11.8856 14.5 12.8284 13.9142 13.4142C13.3284 14 12.3856 14 10.5 14H9.5C7.61438 14 6.67157 14 6.08579 13.4142C5.5 12.8284 5.5 11.8856 5.5 10V4C5.5 2.11438 5.5 1.17157 6.08579 0.58579C6.67157 2.28882e-07 7.61438 0 9.5 0H10.5Z"
                fill="#2A2B2A"
              />
              <path
                d="M16.5 3V11C16.5 12.6569 17.8431 14 19.5 14C19.7761 14 20 13.7761 20 13.5V0.5C20 0.22386 19.7761 0 19.5 0C17.8431 0 16.5 1.34315 16.5 3Z"
                fill="#2A2B2A"
              />
            </svg>
            <span>Posts Shared</span>
          </li>
          <li className="w-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM10 2.85714C10.4736 2.85714 10.9278 3.04528 11.2627 3.38017C11.5976 3.71505 11.7857 4.16926 11.7857 4.64286C11.7857 5.11646 11.5976 5.57066 11.2627 5.90555C10.9278 6.24043 10.4736 6.42857 10 6.42857C9.5264 6.42857 9.0722 6.24043 8.73731 5.90555C8.40242 5.57066 8.21429 5.11646 8.21429 4.64286C8.21429 4.16926 8.40242 3.71505 8.73731 3.38017C9.0722 3.04528 9.5264 2.85714 10 2.85714ZM8.57143 10C8.57143 9.21102 9.21102 8.57143 10 8.57143C10.789 8.57143 11.4286 9.21102 11.4286 10V15.7143C11.4286 16.5033 10.789 17.1429 10 17.1429C9.21102 17.1429 8.57143 16.5033 8.57143 15.7143V10Z"
                fill="black"
              />
            </svg>
            <span>Status</span>
          </li>
        </ul>

        <div className={styles.table_body}>
          {Array.isArray(pageState.fetchedCampaigns) &&
          pageState.fetchedCampaigns.length > 0 ? (
            pageState.fetchedCampaigns.map((ele, idx) => (
              <ul className="w-[100%]">
                <li className="w-[5%]">{idx + 1}</li>
                <li className="w-[35%]">{ele.content}</li>
                <li className="w-[20%]">
                  {convertTimestampToDate(ele.timestamp)}
                </li>
                <li className="w-[20%]">{ele.posts_shared}</li>
                <li className="w-[20%]">
                  <span
                    className={`${styles.status_page} ${
                      ele.status === "Running"
                        ? styles.running
                        : ele.status === "Paused"
                        ? styles.paused
                        : ele.status === "Finished"
                        ? styles.finished
                        : ""
                    }`}
                  >
                    {ele.status === "Running"
                      ? runningClockIcon
                      : ele.status === "Paused"
                      ? pausedIcon
                      : ele.status === "Finished"
                      ? finishedCheckIcon
                      : ""}

                    {ele.status}
                  </span>
                </li>
              </ul>
            ))
          ) : (
            <span className="custom-loader w-fit m-auto"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCampaigns;
