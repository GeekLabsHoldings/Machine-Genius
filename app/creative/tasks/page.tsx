"use client";
import React from "react";
import styles from "./tasks.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

export default function VideoDatabaseTable() {
  function getRandomBackgroundColor() {
    const colors = [
      "#F36F24B2",
      "#9B5FBFB2",
      "#E1C655B2",
      "#31B2E9B2",
      "#E9313EB2",
    ];

    // Select a random index from the array of colors
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the color at the random index
    return colors[randomIndex];
  }

  const bodyRow = [
    {
      task: "User Journey",
      assignedTo: "Manar",
      project: "Investocracy",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Paused",
    },
    {
      task: "Kick Off Call",
      assignedTo: "Sherry",
      project: "Street Politics",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Paused",
    },
    {
      task: "Ux Research",
      assignedTo: "Kamel",
      project: "Canada",
      deadline: "12 March 2024",
      status: "Paused",
      handover: "Paused",
    },
    {
      task: "Design System",
      assignedTo: "Yara",
      project: "PST USA",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Finished",
    },
    {
      task: "User Journey",
      assignedTo: "Sherry",
      project: "Street Politics",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Paused",
    },
    {
      task: "Design System",
      assignedTo: "Manar",
      project: "Investocracy",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Finished",
    },
    {
      task: "Handover Flow",
      assignedTo: "Kamel",
      project: "Canada",
      deadline: "12 March 2024",
      status: "Paused",
      handover: "Paused",
    },
    {
      task: "User Journey",
      assignedTo: "Manar",
      project: "Investocracy",
      deadline: "12 March 2024",
      status: "Paused",
      handover: "Paused",
    },
    {
      task: "UI Design Flow",
      assignedTo: "Shahenda",
      project: "PST Asia",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Finished",
    },
    {
      task: "Handover Flow",
      assignedTo: "Sherry",
      project: "Street Politics",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Finished",
    },
    {
      task: "User Journey",
      assignedTo: "Yara",
      project: "PST USA",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Finished",
    },
    {
      task: "UI Design Flow",
      assignedTo: "Kamel",
      project: "Canada",
      deadline: "12 March 2024",
      status: "Paused",
      handover: "Paused",
    },
    {
      task: "UI Design Flow",
      assignedTo: "Shahenda",
      project: "PST Asia",
      deadline: "12 March 2024",
      status: "Finished",
      handover: "Finished",
    },
  ];

  return (
    <div className={`${styles.task} py-[4.4vh]`}>
      <div className=" flex items-center justify-between">
        <div className={` flex gap-[0.938vw]`}>
          <div className="mb-[3vh]">
            {/* Staff Member */}
            <h5 className=" mb-[1vh] font-semibold">Staff Member</h5>
            <div className="w-[11.927vw]">
              {/* CustomSelectInput for staff members */}
            <CustomSelectInput options={["All",...bodyRow.map((e,i)=>e.assignedTo)]} />
            </div>
          </div>
          <div className="mb-[3vh]">
            <h5 className=" mb-[1vh] font-semibold">Projects</h5>
            <div className="w-[11.927vw]">
              {/* CustomSelectInput for projects */}
            <CustomSelectInput options={["All",...bodyRow.map((e,i)=>e.project)]} />
            </div>
          </div>
          <div className="mb-[3vh]">
            <h5 className=" mb-[1vh] font-semibold">Deadline</h5>
            <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
              <span className={`${styles.dataSort}`}>Ascend</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                  fill="#2A2B2A"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Button to create a new task */}
        <CustomBtn
          word="Create New Task"
          btnColor="black"
          icon={
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.74821 10.3277C4.74316 10.834 5.14944 11.2485 5.65569 11.2535C6.16194 11.2585 6.57641 10.8523 6.58145 10.346L6.61801 6.67953L10.2845 6.71609C10.7907 6.72113 11.2052 6.31485 11.2102 5.8086C11.2153 5.30235 10.809 4.88789 10.3028 4.88284L6.63628 4.84629L6.67283 1.17981C6.67788 0.673567 6.2716 0.259095 5.76535 0.254048C5.2591 0.249001 4.84464 0.65529 4.83959 1.16153L4.80304 4.82802L1.13656 4.79146C0.630324 4.78642 0.215843 5.1927 0.210796 5.69895C0.205749 6.2052 0.612047 6.61966 1.11828 6.6247L4.78476 6.66126L4.74821 10.3277Z"
                fill="#FFFFFB"
              />
            </svg>
          }
        />
      </div>
      <div className={`${styles.tableContainer} h-[65vh]`}>
        {/* Start Table */}
        <div className={styles.table}>
          {/* Table Header */}
          <ul className={styles.table_header}>
            <li className="w-[16.66676%]">
              <span>Task</span>
            </li>
            <li className="w-[16.66676%]">
              <span>Assigned To</span>
            </li>
            <li className="w-[16.66676%]">
              <span>Project</span>
            </li>
            <li className="w-[16.66676%]">
              <span>Deadline</span>
            </li>
            <li className="w-[16.66676%]">
              <span>Status</span>
            </li>
            <li className="w-[16.66676%]">
              <span>Handover</span>
            </li>
          </ul>

          {/* Table Body */}
          <div className={styles.table_body}>
            {bodyRow.map((e, idx) => (
              <ul className="w-[100%]" key={idx}>
                <li className="w-[16.66676%]">{e.task}</li>
                <li className="w-[16.66676%]">
                  <span
                    className={`${
                      styles[e.assignedTo]
                    }  p-[0.417vw] rounded-md`}
                    style={{ backgroundColor: `${getRandomBackgroundColor()}` }}
                  >
                    {e.assignedTo}
                  </span>
                </li>
                <li className="w-[16.66676%]">
                  <span
                    className="p-[0.417vw] rounded-md w-fit"
                    style={{ backgroundColor: `${getRandomBackgroundColor()}` }}
                  >
                    {e.project}
                  </span>
                </li>
                <li className="w-[16.66676%]">{e.deadline}</li>
                <li className="w-[16.66676%]">
                  <span
                    className="p-[0.417vw] rounded-md flex items-center"
                    style={{
                      backgroundColor: `${
                        e.status == "Finished" ? "#5FA85BB5" : "#E1C655B2"
                      }`,
                    }}
                  >
                    {e.status == "Finished" ? (
                      <svg
                        width="13"
                        height="19"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 0.5C3.67392 0.5 2.40215 1.02678 1.46447 1.96447C0.526784 2.90215 0 4.17392 0 5.5C0 6.82608 0.526784 8.09785 1.46447 9.03553C2.40215 9.97322 3.67392 10.5 5 10.5C6.32608 10.5 7.59785 9.97322 8.53553 9.03553C9.47322 8.09785 10 6.82608 10 5.5C10 4.17392 9.47322 2.90215 8.53553 1.96447C7.59785 1.02678 6.32608 0.5 5 0.5ZM7.11377 2.88021C7.36798 2.56239 7.84144 2.53459 8.1311 2.82048C8.38128 3.0674 8.40426 3.4635 8.18433 3.7377L4.62621 8.17381C4.24596 8.6479 3.53422 8.67599 3.11779 8.23335L1.1845 6.17838C0.923006 5.90043 0.93108 5.4646 1.20269 5.19652C1.47641 4.92636 1.91644 4.92636 2.19017 5.19652L3.11622 6.11054C3.53858 6.5274 4.22893 6.48687 4.59961 6.02345L7.11377 2.88021Z"
                          fill="#2A2B2A"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="20"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 5.5C10 6.82608 9.47322 8.09785 8.53553 9.03553C7.59785 9.97322 6.32608 10.5 5 10.5C3.67392 10.5 2.40215 9.97322 1.46447 9.03553C0.526784 8.09785 0 6.82608 0 5.5C0 4.17392 0.526784 2.90215 1.46447 1.96447C2.40215 1.02678 3.67392 0.5 5 0.5C6.32608 0.5 7.59785 1.02678 8.53553 1.96447C9.47322 2.90215 10 4.17392 10 5.5ZM2.5 3.41667C2.5 3.30616 2.5439 3.20018 2.62204 3.12204C2.70018 3.0439 2.80616 3 2.91667 3H3.75C3.86051 3 3.96649 3.0439 4.04463 3.12204C4.12277 3.20018 4.16667 3.30616 4.16667 3.41667V7.58333C4.16667 7.69384 4.12277 7.79982 4.04463 7.87796C3.96649 7.9561 3.86051 8 3.75 8H2.91667C2.80616 8 2.70018 7.9561 2.62204 7.87796C2.5439 7.79982 2.5 7.69384 2.5 7.58333V3.41667ZM6.25 3C6.13949 3 6.03351 3.0439 5.95537 3.12204C5.87723 3.20018 5.83333 3.30616 5.83333 3.41667V7.58333C5.83333 7.69384 5.87723 7.79982 5.95537 7.87796C6.03351 7.9561 6.13949 8 6.25 8H7.08333C7.19384 8 7.29982 7.9561 7.37796 7.87796C7.4561 7.79982 7.5 7.69384 7.5 7.58333V3.41667C7.5 3.30616 7.4561 3.20018 7.37796 3.12204C7.29982 3.0439 7.19384 3 7.08333 3H6.25Z"
                          fill="#FFFFFB"
                        />
                      </svg>
                    )}{" "}
                    {e.status}
                  </span>
                </li>
                <li className="w-[16.66676%]">
                  <span
                    className="p-[0.417vw] rounded-md flex items-center"
                    style={{
                      backgroundColor: `${
                        e.handover == "Finished" ? "#5FA85BB5" : "#E1C655B2"
                      }`,
                    }}
                  >
                    {e.status == "Finished" ? (
                      <svg
                        width="13"
                        height="19"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 0.5C3.67392 0.5 2.40215 1.02678 1.46447 1.96447C0.526784 2.90215 0 4.17392 0 5.5C0 6.82608 0.526784 8.09785 1.46447 9.03553C2.40215 9.97322 3.67392 10.5 5 10.5C6.32608 10.5 7.59785 9.97322 8.53553 9.03553C9.47322 8.09785 10 6.82608 10 5.5C10 4.17392 9.47322 2.90215 8.53553 1.96447C7.59785 1.02678 6.32608 0.5 5 0.5ZM7.11377 2.88021C7.36798 2.56239 7.84144 2.53459 8.1311 2.82048C8.38128 3.0674 8.40426 3.4635 8.18433 3.7377L4.62621 8.17381C4.24596 8.6479 3.53422 8.67599 3.11779 8.23335L1.1845 6.17838C0.923006 5.90043 0.93108 5.4646 1.20269 5.19652C1.47641 4.92636 1.91644 4.92636 2.19017 5.19652L3.11622 6.11054C3.53858 6.5274 4.22893 6.48687 4.59961 6.02345L7.11377 2.88021Z"
                          fill="#2A2B2A"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="20"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 5.5C10 6.82608 9.47322 8.09785 8.53553 9.03553C7.59785 9.97322 6.32608 10.5 5 10.5C3.67392 10.5 2.40215 9.97322 1.46447 9.03553C0.526784 8.09785 0 6.82608 0 5.5C0 4.17392 0.526784 2.90215 1.46447 1.96447C2.40215 1.02678 3.67392 0.5 5 0.5C6.32608 0.5 7.59785 1.02678 8.53553 1.96447C9.47322 2.90215 10 4.17392 10 5.5ZM2.5 3.41667C2.5 3.30616 2.5439 3.20018 2.62204 3.12204C2.70018 3.0439 2.80616 3 2.91667 3H3.75C3.86051 3 3.96649 3.0439 4.04463 3.12204C4.12277 3.20018 4.16667 3.30616 4.16667 3.41667V7.58333C4.16667 7.69384 4.12277 7.79982 4.04463 7.87796C3.96649 7.9561 3.86051 8 3.75 8H2.91667C2.80616 8 2.70018 7.9561 2.62204 7.87796C2.5439 7.79982 2.5 7.69384 2.5 7.58333V3.41667ZM6.25 3C6.13949 3 6.03351 3.0439 5.95537 3.12204C5.87723 3.20018 5.83333 3.30616 5.83333 3.41667V7.58333C5.83333 7.69384 5.87723 7.79982 5.95537 7.87796C6.03351 7.9561 6.13949 8 6.25 8H7.08333C7.19384 8 7.29982 7.9561 7.37796 7.87796C7.4561 7.79982 7.5 7.69384 7.5 7.58333V3.41667C7.5 3.30616 7.4561 3.20018 7.37796 3.12204C7.29982 3.0439 7.19384 3 7.08333 3H6.25Z"
                          fill="#FFFFFB"
                        />
                      </svg>
                    )}
                    {e.handover}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
        {/* End Table */}
      </div>
    </div>
  );
}
