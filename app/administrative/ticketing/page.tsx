"use client"; // Directive to indicate that this file is a client component in a Next.js application.
import React, { useContext, useEffect, useState } from "react"; // Importing React and useState hook.
import styles from "./ticketing.module.css"; // Importing CSS module for styling.
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing CustomSelectInput component.
import CreateTicketModal from "@/app/_components/Administrative/02TicketingDatabase/CreateTicketModal"; // Importing CreateTicketModal component.
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import convertTimestampToDate from "@/app/_utils/convertTimestampToDate";

const newRibbon = (
  <svg
    className="w-[--40px] h-[--20px]"
    viewBox="0 0 40 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39.8398 17.2949L35.2617 9.43367L39.7931 1.89305C39.9007 1.71336 39.9594 1.50783 39.9632 1.29749C39.967 1.08716 39.9158 0.879561 39.8149 0.695947C39.7139 0.512334 39.5667 0.359293 39.3885 0.252483C39.2102 0.145673 39.0073 0.0889263 38.8004 0.0880509L1.65717 0C1.03768 0 0.451497 0 0.000669185 0C-0.00173606 0.392269 0.00311587 1.83316 0.00311587 2.46305V16.713C0.00311587 17.3429 0 18.5879 0.00461689 19.0879C0.504854 19.0879 1.71941 19.088 2.33889 19.088H38.8354C39.0416 19.088 39.244 19.0325 39.4222 18.9272C39.6004 18.8218 39.748 18.6704 39.8501 18.4882C39.9521 18.3061 40.0049 18.0998 40.0031 17.8902C40.0013 17.6806 39.9449 17.4752 39.8398 17.2949ZM12.2776 13.3643H10.9696L7.16228 8.21054V13.3762H5.84256V6.02555H7.16228L10.9813 11.1912V6.02555H12.2893L12.2776 13.3643ZM19.6704 7.21305H15.5477V8.98242H19.285V10.1699H15.5477V12.0818H19.6704V13.2693H14.228V6.02555H19.6587L19.6704 7.21305ZM29.3522 13.3405H28.0325L26.2222 7.88992L24.412 13.3643H23.104L20.7682 6.02555H22.193L23.7346 11.2862L25.5098 6.02555H26.9346L28.6398 11.2862L30.193 6.02555H31.6295L29.3522 13.3405Z"
      fill="#E9313E"
    />
  </svg>
);
const ticketTypeOptions: string[] = ["All", "IT", "System Issue", "Request"];

export default function Page() {
  // Defining ticket type options for the select input.

  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<any>({
    tickets: null,
    filteredTickets: null,
  });

  const [filterBy, setFilterBy] = useState({
    ticketType: "",
    dateOrder: true,
  });

  async function getTickets() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/tickets/get-tickets?limit=1000`,
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
      const json = await res.json();
      if (json && json.length > 0) {
        setPageState((prevState: any) => ({
          ...prevState,
          tickets: json,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTickets:", error);
    }
  }

  useEffect(() => {
    getTickets();
  }, []);

  function isWithinLastWeek(timestamp: string) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(timestamp) > oneWeekAgo;
  }

  useEffect(() => {
    if (Array.isArray(pageState.tickets) && pageState.tickets.length > 0) {
      let filteredData = pageState.tickets.filter((item: any) => {
        return filterBy.ticketType
          ? item.ticketType === filterBy.ticketType
          : true;
      });

      // Sort the filtered data based on dateOrder
      filteredData.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return filterBy.dateOrder ? dateB - dateA : dateA - dateB;
      });

      setPageState((prevState: any) => ({
        ...prevState,
        filteredTickets: filteredData,
      }));
    }
  }, [filterBy, pageState.tickets]);

  return (
    <div className="pageHeader">
      <h3 className="mt-[25px]">Ticket Database</h3>

      {/* Filters section to filter and edit data in the table */}
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[25px]`}>
        <div className="flex justify-between items-center">
          {/* Left section containing filters */}
          <div
            className={`${styles.ticketingPage} w-8/12 flex items-end gap-[1vw]`}
          >
            {/* Ticket Type filter */}
            <div className="flex flex-col w-1/4 gap-[0.3vw]">
              <h5>Ticket Type</h5>
              <CustomSelectInput
                label="All"
                options={ticketTypeOptions}
                hoverColor="hover:bg-[#31B2E9]"
                getValue={(value: string) =>
                  setFilterBy({
                    ...filterBy,
                    ticketType: value === "All" ? "" : value,
                  })
                }
              />
            </div>
            {/* Date filter with order toggle */}
            <div className="flex flex-col w-[25%] gap-[0.3vw]">
              <h5>Date</h5>
              <div
                className={`${styles.changeOrder} `}
                onClick={() => {
                  // Toggles the date order between ascending and descending.
                  setFilterBy((prev) => ({
                    ...prev,
                    dateOrder: !prev.dateOrder,
                  }));
                }}
              >
                <p>{filterBy.dateOrder ? "Descend" : "Ascend"}</p>
                {/* SVG icon for the date order toggle button */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721067 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139324 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139324 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right section containing the button to open the Create Ticket modal */}
          <div className="flex gap-2">
            {/* Button to open modal for creating a new ticket */}
            <CreateTicketModal
              btnWord={"Create Ticket"} // Text for the button.
              btnIcon={
                // SVG icon for the button.
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
              btnColor={"black"} // Button color.
              modalTitle={"Create Ticket"} // Title of the modal.
              getTickets={getTickets}
            />
          </div>
        </div>
      </div>

      {/* Component to display the ticketing database table */}
      <div className={`h-[65vh]`}>
        {/* Start Table */}
        <div className={styles.table}>
          {/* Table Header */}
          <ul className={styles.table_header}>
            <li className="w-[20%]">
              <svg
                width="25"
                height="15"
                viewBox="0 0 25 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 5.46196V2.50913C25 1.34287 24.0546 0.397461 22.8885 0.397461H2.11143C0.945361 0.397412 0 1.34282 0 2.50908V5.48164C1.07212 5.63564 1.89717 6.55527 1.89717 7.67007C1.89717 8.78486 1.07212 9.70459 0 9.8582V12.8312C0 13.997 0.945361 14.9424 2.11143 14.9424H22.8885C24.0545 14.9424 25 13.997 25 12.8312V9.87788C23.8268 9.823 22.8919 8.85703 22.8919 7.67012C22.8919 6.48325 23.8269 5.51729 25 5.46196ZM5.93335 13.6102H5.20693V11.7155H5.93335V13.6102ZM5.93335 10.2815H5.20693V8.38691H5.93335V10.2815ZM5.93335 6.95293H5.20693V5.05791H5.93335V6.95293ZM5.93335 3.62437H5.20693V1.72974H5.93335V3.62437Z"
                  fill="#2A2B2A"
                />
              </svg>

              <span>Ticket Type</span>
            </li>
            <li className="w-[20%]">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8679 0.504009C15.7805 0.350952 15.6542 0.223723 15.5018 0.135213C15.3493 0.0467033 15.1762 5.6855e-05 14.9999 0H0.999694C0.824573 5.6475e-05 0.652537 0.046099 0.500798 0.133521C0.349059 0.220944 0.222937 0.34668 0.135051 0.498152C0.0471656 0.649623 0.000597416 0.821518 5.70997e-06 0.996638C-0.000585996 1.17176 0.0448195 1.34396 0.13168 1.49603L3.84874 8.00014L0.13168 14.5042C0.0448195 14.6563 -0.000585996 14.8285 5.70997e-06 15.0036C0.000597416 15.1788 0.0471656 15.3506 0.135051 15.5021C0.222937 15.6536 0.349059 15.7793 0.500798 15.8668C0.652537 15.9542 0.824573 16.0002 0.999694 16.0003H14.9999C15.1762 16.0002 15.3493 15.9536 15.5018 15.8651C15.6542 15.7765 15.7805 15.6493 15.8679 15.4963L19.868 8.49615C19.9545 8.34514 20 8.17415 20 8.00014C20 7.82612 19.9545 7.65513 19.868 7.50413L15.8679 0.504009ZM14.4199 14.0002H2.72372L5.86878 8.49615C5.95526 8.34514 6.00076 8.17415 6.00076 8.00014C6.00076 7.82612 5.95526 7.65513 5.86878 7.50413L2.72372 2.00003H14.4199L17.849 8.00014L14.4199 14.0002Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M18 8L14.5 14.5L1.5 14L5 7.5L2.5 1.5H14.5L18 8Z"
                  fill="#2A2B2A"
                  stroke="#2A2B2A"
                />
              </svg>
              <span>Subject Line</span>
            </li>
            <li className="w-[20%]">
              <svg
                width="20"
                height="25"
                viewBox="0 0 20 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 0H16.25C17.2446 0 18.1984 0.395088 18.9017 1.09835C19.6049 1.80161 20 2.75544 20 3.75V21.25C20 22.2446 19.6049 23.1984 18.9017 23.9017C18.1984 24.6049 17.2446 25 16.25 25H3.75C2.75544 25 1.80161 24.6049 1.09835 23.9017C0.395088 23.1984 0 22.2446 0 21.25L0 3.75C0 2.75544 0.395088 1.80161 1.09835 1.09835C1.80161 0.395088 2.75544 0 3.75 0ZM5 8.75C4.66848 8.75 4.35054 8.8817 4.11612 9.11612C3.8817 9.35054 3.75 9.66848 3.75 10C3.75 10.3315 3.8817 10.6495 4.11612 10.8839C4.35054 11.1183 4.66848 11.25 5 11.25H15C15.3315 11.25 15.6495 11.1183 15.8839 10.8839C16.1183 10.6495 16.25 10.3315 16.25 10C16.25 9.66848 16.1183 9.35054 15.8839 9.11612C15.6495 8.8817 15.3315 8.75 15 8.75H5ZM5 18.75C4.66848 18.75 4.35054 18.8817 4.11612 19.1161C3.8817 19.3505 3.75 19.6685 3.75 20C3.75 20.3315 3.8817 20.6495 4.11612 20.8839C4.35054 21.1183 4.66848 21.25 5 21.25H11.25C11.5815 21.25 11.8995 21.1183 12.1339 20.8839C12.3683 20.6495 12.5 20.3315 12.5 20C12.5 19.6685 12.3683 19.3505 12.1339 19.1161C11.8995 18.8817 11.5815 18.75 11.25 18.75H5ZM5 3.75C4.66848 3.75 4.35054 3.8817 4.11612 4.11612C3.8817 4.35054 3.75 4.66848 3.75 5C3.75 5.33152 3.8817 5.64946 4.11612 5.88388C4.35054 6.1183 4.66848 6.25 5 6.25H15C15.3315 6.25 15.6495 6.1183 15.8839 5.88388C16.1183 5.64946 16.25 5.33152 16.25 5C16.25 4.66848 16.1183 4.35054 15.8839 4.11612C15.6495 3.8817 15.3315 3.75 15 3.75H5ZM5 13.75C4.66848 13.75 4.35054 13.8817 4.11612 14.1161C3.8817 14.3505 3.75 14.6685 3.75 15C3.75 15.3315 3.8817 15.6495 4.11612 15.8839C4.35054 16.1183 4.66848 16.25 5 16.25H15C15.3315 16.25 15.6495 16.1183 15.8839 15.8839C16.1183 15.6495 16.25 15.3315 16.25 15C16.25 14.6685 16.1183 14.3505 15.8839 14.1161C15.6495 13.8817 15.3315 13.75 15 13.75H5Z"
                  fill="black"
                />
              </svg>

              <span>Description</span>
            </li>
            <li className="w-[20%]">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.33333 12H10.6667V10.6667H9.33333V12ZM9.33333 17.3333H10.6667V16H9.33333V17.3333ZM14.6667 12H16V10.6667H14.6667V12ZM14.6667 17.3333H16V16H14.6667V17.3333ZM4 17.3333H5.33333V16H4V17.3333ZM18.6667 5.33333H1.33333V4C1.33333 3.264 1.93067 2.66667 2.66667 2.66667H5.33333V3.33333C5.33333 3.702 5.63133 4 6 4C6.36867 4 6.66667 3.702 6.66667 3.33333V2.66667H13.3333V3.33333C13.3333 3.702 13.6313 4 14 4C14.3687 4 14.6667 3.702 14.6667 3.33333V2.66667H17.3333C18.0693 2.66667 18.6667 3.264 18.6667 4V5.33333ZM17.3333 12C17.3333 12.736 16.736 13.3333 16 13.3333H14.6667C13.9307 13.3333 13.3333 12.736 13.3333 12V10.6667C13.3333 9.93067 13.9307 9.33333 14.6667 9.33333H16C16.736 9.33333 17.3333 9.93067 17.3333 10.6667V12ZM17.3333 17.3333C17.3333 18.0693 16.736 18.6667 16 18.6667H14.6667C13.9307 18.6667 13.3333 18.0693 13.3333 17.3333V16C13.3333 15.264 13.9307 14.6667 14.6667 14.6667H16C16.736 14.6667 17.3333 15.264 17.3333 16V17.3333ZM12 12C12 12.736 11.4027 13.3333 10.6667 13.3333H9.33333C8.59733 13.3333 8 12.736 8 12V10.6667C8 9.93067 8.59733 9.33333 9.33333 9.33333H10.6667C11.4027 9.33333 12 9.93067 12 10.6667V12ZM12 17.3333C12 18.0693 11.4027 18.6667 10.6667 18.6667H9.33333C8.59733 18.6667 8 18.0693 8 17.3333V16C8 15.264 8.59733 14.6667 9.33333 14.6667H10.6667C11.4027 14.6667 12 15.264 12 16V17.3333ZM6.66667 12C6.66667 12.736 6.06933 13.3333 5.33333 13.3333H4C3.264 13.3333 2.66667 12.736 2.66667 12V10.6667C2.66667 9.93067 3.264 9.33333 4 9.33333H5.33333C6.06933 9.33333 6.66667 9.93067 6.66667 10.6667V12ZM6.66667 17.3333C6.66667 18.0693 6.06933 18.6667 5.33333 18.6667H4C3.264 18.6667 2.66667 18.0693 2.66667 17.3333V16C2.66667 15.264 3.264 14.6667 4 14.6667H5.33333C6.06933 14.6667 6.66667 15.264 6.66667 16V17.3333ZM17.3333 1.33333H14.6667V0.666667C14.6667 0.298667 14.3687 0 14 0C13.6313 0 13.3333 0.298667 13.3333 0.666667V1.33333H6.66667V0.666667C6.66667 0.298667 6.36867 0 6 0C5.63133 0 5.33333 0.298667 5.33333 0.666667V1.33333H2.66667C1.194 1.33333 0 2.52733 0 4V18.6667C0 20.1393 1.194 21.3333 2.66667 21.3333H17.3333C18.806 21.3333 20 20.1393 20 18.6667V4C20 2.52733 18.806 1.33333 17.3333 1.33333ZM4 12H5.33333V10.6667H4V12Z"
                  fill="#2A2B2A"
                />
              </svg>

              <span>Date Added</span>
            </li>
          </ul>

          {/* Table Body */}
          <div className={styles.table_body}>
            {Array.isArray(pageState.filteredTickets) &&
            pageState.filteredTickets.length > 0 ? (
              pageState.filteredTickets.map((e: any) => (
                <ul className="w-[100%] relative" key={e._id}>
                  <div className="absolute">
                    {e.createdAt && isWithinLastWeek(e.createdAt) && newRibbon}
                  </div>
                  <li className="w-[20%]">{e.ticketType}</li>
                  <li className="w-[20%]">{e.subjectLine}</li>
                  <li className="w-[20%]">{e.ticketDescription}</li>
                  <li className="w-[20%]">
                    {convertTimestampToDate(e.createdAt)}
                  </li>
                </ul>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-gray-500">No tickets found!</span>
              </div>
            )}
          </div>
        </div>
        {/* End Table */}
      </div>
    </div>
  );
}
