"use client"; // Directive to indicate that this file is a client component in a Next.js application.
import TicketingDatabaseTable from "@/app/_components/Administrative/02TicketingDatabase/TicketingDatabaseTable"; // Importing the TicketingDatabaseTable component.
import React, { useContext, useState } from "react"; // Importing React and useState hook.
import styles from "./ticketing.module.css"; // Importing CSS module for styling.
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing CustomSelectInput component.
import CreateTicketModal from "@/app/_components/Administrative/02TicketingDatabase/CreateTicketModal"; // Importing CreateTicketModal component.
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";

export default function Page() {
  // Defining ticket type options for the select input.
  const ticketTypeOptions: string[] = ["All", "IT", "System Issue", "Request"];
  // State variable to manage the order of dates, initialized to true (ascending).
  const [dateOrder, setDateOrder] = useState<boolean>(true);
  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<any>({
    tickets: null,
  });

  async function getTickets() {
    try {
      const res = await fetch(
        `https://api.machinegenius.io/administrative/tickets/get-tickets?limit=1000`,
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
              />
            </div>
            {/* Date filter with order toggle */}
            <div className="flex flex-col w-[25%] gap-[0.3vw]">
              <h5>Date</h5>
              <div
                className={`${styles.changeOrder} `}
                onClick={() => {
                  // Toggles the date order between ascending and descending.
                  setDateOrder((prev) => !prev);
                }}
              >
                <p>{dateOrder ? "Ascend" : "Descend"}</p>
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
      <TicketingDatabaseTable
        tickets={pageState.tickets}
        getTickets={getTickets}
      />
    </div>
  );
}
