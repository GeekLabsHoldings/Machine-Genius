import React from "react";
import styles from "./PlatformBox.module.css";
import CustomBtn from "../../Button/CustomBtn";
import { addIcon } from "@/app/_utils/svgIcons";

interface IPlatformCard {
  title: string;
  subscribers?: string;
  engagement?: string;
}

interface IProps {
  platformIcon: JSX.Element;
  platformName: string;
  platformRoute: string;
  platformColor: string;
  platformCards: IPlatformCard[];
}

export default function PlatformBox({
  platformIcon,
  platformName,
  platformRoute,
  platformColor,
  platformCards,
}: IProps) {
  return (
    <div className={`${styles.platformBox} h-[65vh] w-1/3 flex flex-col`}>
      {/* 01- Header */}
      <div
        className={`${styles.platformBoxHeader} flex justify-between items-center`}
      >
        <div className="flex gap-[0.5vw] items-center">
          {platformIcon}
          <h3>{platformName}</h3>
        </div>
        <CustomBtn icon={addIcon} btnColor="black" href={platformRoute} />
      </div>

      {/* 02- Body */}
      <div className="flex flex-col mt-[--sy-27px] gap-[--sy-27px] overflow-y-auto p-[--5px] pr-[--8px]">
        {platformCards.map((card, i) => (
          <div
            className={`${styles.platformBox} h-[16vh] flex flex-col gap-[0.8vw] !pt-[--sy-18px]`}
          >
            <div className={`${styles.platformBoxHeaderSm}`}>
              <h6 style={{ color: platformColor }} className="!mb-[--sy-14px]">
                {card.title}
              </h6>
            </div>

            {card.subscribers && (
              <div className="flex justify-between">
                <div className="flex items-center gap-[1vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.67773 4.54339C8.67773 2.03415 10.7119 0 13.2211 0C15.7303 0 17.7645 2.03415 17.7645 4.54339C17.7645 7.05261 15.7303 9.08678 13.2211 9.08678C10.7119 9.08678 8.67773 7.05261 8.67773 4.54339ZM13.2211 1.81736C11.7155 1.81736 10.4951 3.03785 10.4951 4.54339C10.4951 6.04893 11.7155 7.26942 13.2211 7.26942C14.7267 7.26942 15.9472 6.04893 15.9472 4.54339C15.9472 3.03785 14.7267 1.81736 13.2211 1.81736Z"
                      fill="#2A2B2A"
                    />
                    <path
                      d="M7.50328 6.69974C7.85814 7.05458 7.85814 7.62996 7.50328 7.98479L4.18983 11.2983C3.65754 11.8305 2.79453 11.8305 2.26224 11.2983L0.766143 9.80215C0.411286 9.44731 0.411286 8.87194 0.766143 8.5171C1.12101 8.16226 1.69635 8.16226 2.05121 8.5171L3.22603 9.69193L6.21821 6.69974C6.57308 6.34488 7.14841 6.34488 7.50328 6.69974Z"
                      fill="#2A2B2A"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2304 10.0771C11.4186 10.0771 9.68234 10.3081 8.36386 10.8937C7.01969 11.4905 5.96094 12.5435 5.96094 14.1662C5.96094 14.5903 6.03839 15.0729 6.32688 15.5331C6.61534 15.9932 7.05849 16.3415 7.63091 16.6005C8.72959 17.0975 10.4897 17.3466 13.2304 17.3466C15.971 17.3466 17.7311 17.0975 18.8298 16.6005C19.4022 16.3415 19.8454 15.9932 20.1339 15.5331C20.4224 15.0729 20.4998 14.5903 20.4998 14.1662C20.4998 12.5435 19.441 11.4905 18.0969 10.8937C16.7784 10.3081 15.0421 10.0771 13.2304 10.0771ZM7.77829 14.1662C7.77829 13.5172 8.14344 12.98 9.10142 12.5546C10.0851 12.1179 11.5291 11.8945 13.2304 11.8945C14.9316 11.8945 16.3757 12.1179 17.3593 12.5546C18.3173 12.98 18.6824 13.5172 18.6824 14.1662C18.6824 14.3694 18.6463 14.4844 18.594 14.5678C18.5418 14.6512 18.417 14.7926 18.0807 14.9447C17.362 15.2698 15.9418 15.5292 13.2304 15.5292C10.519 15.5292 9.09869 15.2698 8.38001 14.9447C8.04375 14.7926 7.91898 14.6512 7.86669 14.5678C7.81442 14.4844 7.77829 14.3694 7.77829 14.1662Z"
                      fill="#2A2B2A"
                    />
                    <rect
                      x="10.5"
                      y="1.81836"
                      width="5.45455"
                      height="5.45455"
                      fill="#2A2B2A"
                    />
                    <ellipse
                      cx="13.2269"
                      cy="14.0911"
                      rx="6.36364"
                      ry="2.27273"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <h5>Subscribers</h5>
                </div>
                <p>{card.subscribers}</p>
              </div>
            )}

            {card.engagement && (
              <div className="flex justify-between">
                <div className="flex items-center gap-[1vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M3.625 6.20605H1.28125C0.849766 6.20605 0.5 6.55582 0.5 6.9873V16.7529C0.5 17.1844 0.849766 17.5342 1.28125 17.5342H3.625C4.05648 17.5342 4.40625 17.1844 4.40625 16.7529V6.9873C4.40625 6.55582 4.05648 6.20605 3.625 6.20605Z"
                      fill="#2A2B2A"
                    />
                    <path
                      d="M13.6694 6.20605C13.0679 6.20605 12.6832 5.565 12.9663 5.03418L14.3895 2.3657C14.8772 1.45117 14.2145 0.34668 13.1781 0.34668C12.8139 0.34668 12.4648 0.491328 12.2073 0.748789L7.66527 5.29078C7.07926 5.87684 6.75 6.67168 6.75 7.50047V14.4092C6.75 16.1351 8.1491 17.5342 9.875 17.5342H16.3455C17.412 17.5342 18.3441 16.8141 18.6133 15.782L20.4327 8.80766C20.4774 8.63645 20.5 8.46023 20.5 8.28332C20.5 7.13609 19.57 6.20605 18.4227 6.20605H13.6694Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <h5>Engagement</h5>
                </div>
                <p>{card.engagement}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
