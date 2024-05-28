"use client";
import React, { useState } from "react";
import styles from "./listDetails.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useRouter } from "next/navigation";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

const page = () => {
  // useState used for the sorting
  const [sorting, setSorting] = useState("Ascend");

  // Handler to swap button text
  const [btnSwapped, setBtnSwapped] = useState(false);

  // useRouter used for navigation
  const router = useRouter();

  // State for handling modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle checkbox changes
  const [checkboxHidden, setCheckboxHidden] = useState(true);

  const headEmailList = [
    {
      name: "Email Address",
      icon: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.34884 0C3.84654 0 2.48805 0.37547 1.50201 1.29107C0.506623 2.21537 0 3.58795 0 5.34884V11.8605C0 13.6214 0.506623 14.994 1.50201 15.9182C2.48805 16.8339 3.84654 17.2093 5.34884 17.2093H14.6512C16.1535 17.2093 17.512 16.8339 18.498 15.9182C19.4934 14.994 20 13.6214 20 11.8605V5.34884C20 3.58795 19.4934 2.21537 18.498 1.29107C17.512 0.37547 16.1535 0 14.6512 0H5.34884ZM16.7242 5.22074C17.029 4.98515 17.0852 4.547 16.8496 4.2421C16.614 3.9372 16.1759 3.88102 15.871 4.11662L10.7109 8.10381C10.2922 8.42744 9.70772 8.42744 9.28893 8.10381L4.12893 4.11662C3.82403 3.88102 3.38588 3.9372 3.15028 4.2421C2.91468 4.547 2.97086 4.98515 3.27576 5.22074L8.43581 9.208C9.35712 9.91981 10.6428 9.91981 11.5641 9.208L16.7242 5.22074Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Subscription",
      icon: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.1781 4.54339C8.1781 2.03415 10.2123 0 12.7215 0C15.2307 0 17.2649 2.03415 17.2649 4.54339C17.2649 7.05261 15.2307 9.08678 12.7215 9.08678C10.2123 9.08678 8.1781 7.05261 8.1781 4.54339ZM12.7215 1.81736C11.2159 1.81736 9.99546 3.03785 9.99546 4.54339C9.99546 6.04893 11.2159 7.26942 12.7215 7.26942C14.2271 7.26942 15.4475 6.04893 15.4475 4.54339C15.4475 3.03785 14.2271 1.81736 12.7215 1.81736Z"
            fill="#2A2B2A"
          />
          <path
            d="M7.00328 6.69974C7.35814 7.05458 7.35814 7.62996 7.00328 7.98479L3.68983 11.2983C3.15754 11.8305 2.29453 11.8305 1.76224 11.2983L0.266143 9.80215C-0.0887144 9.44731 -0.0887144 8.87194 0.266143 8.5171C0.621009 8.16226 1.19635 8.16226 1.55121 8.5171L2.72603 9.69193L5.71821 6.69974C6.07308 6.34488 6.64841 6.34488 7.00328 6.69974Z"
            fill="#2A2B2A"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.7306 10.0771C10.9189 10.0771 9.18258 10.3081 7.86411 10.8937C6.51994 11.4905 5.46118 12.5435 5.46118 14.1662C5.46118 14.5903 5.53864 15.0729 5.82712 15.5331C6.11558 15.9932 6.55874 16.3415 7.13116 16.6005C8.22983 17.0975 9.98994 17.3466 12.7306 17.3466C15.4713 17.3466 17.2314 17.0975 18.3301 16.6005C18.9024 16.3415 19.3456 15.9932 19.6341 15.5331C19.9226 15.0729 20 14.5903 20 14.1662C20 12.5435 18.9412 11.4905 17.5971 10.8937C16.2786 10.3081 14.5423 10.0771 12.7306 10.0771ZM7.27854 14.1662C7.27854 13.5172 7.64368 12.98 8.60166 12.5546C9.58531 12.1179 11.0294 11.8945 12.7306 11.8945C14.4318 11.8945 15.8759 12.1179 16.8595 12.5546C17.8176 12.98 18.1827 13.5172 18.1827 14.1662C18.1827 14.3694 18.1465 14.4844 18.0943 14.5678C18.042 14.6512 17.9172 14.7926 17.5809 14.9447C16.8623 15.2698 15.442 15.5292 12.7306 15.5292C10.0192 15.5292 8.59894 15.2698 7.88025 14.9447C7.544 14.7926 7.41923 14.6512 7.36693 14.5678C7.31467 14.4844 7.27854 14.3694 7.27854 14.1662Z"
            fill="#2A2B2A"
          />
          <rect
            x="10"
            y="1.81836"
            width="5.45455"
            height="5.45455"
            fill="#2A2B2A"
          />
          <ellipse
            cx="12.7273"
            cy="14.0911"
            rx="6.36364"
            ry="2.27273"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Source",
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.962 11.56C12.035 11.62 11.047 11.65 10 11.65C8.953 11.65 7.965 11.62 7.038 11.56C7.305 16.514 8.922 20.3 10 20.3C11.078 20.3 12.694 16.515 12.962 11.56ZM5.026 11.372C5.178 14.943 5.987 17.905 7.086 19.814C2.983 18.554 0 14.704 0 10.15V10.06C1.329 10.681 3.003 11.116 5.026 11.372ZM0.242 7.932C1.369 8.594 2.961 9.072 5.011 9.352C5.114 5.592 5.944 2.47 7.085 0.486C3.67 1.536 1.03 4.38 0.242 7.932ZM7.007 9.554C7.129 4.207 8.864 0 10 0C11.136 0 12.871 4.207 12.993 9.554C12.068 9.618 11.07 9.65 10 9.65C9.00153 9.65223 8.00328 9.62021 7.007 9.554ZM14.974 11.372C16.997 11.116 18.671 10.682 20 10.061V10.15C20 14.704 17.016 18.554 12.915 19.814C14.013 17.904 14.821 14.943 14.974 11.372ZM19.758 7.932C18.631 8.594 17.039 9.072 14.989 9.352C14.886 5.592 14.056 2.47 12.915 0.486C16.33 1.536 18.97 4.38 19.758 7.932Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Brand",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.09889 11.2856L10.6333 20H1.11111C0.497778 20 0 19.5022 0 18.8889V12.8911L9.09889 11.2856ZM18.8889 0C19.5022 0 20 0.497778 20 1.11111V18.8889C20 19.5022 19.5022 20 18.8889 20H12.8911L9.36445 0H18.8889ZM7.10778 0L8.71222 9.09778L0 10.6333V1.11111C0 0.497778 0.497778 0 1.11111 0H7.10778Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Contact Rating",
      icon: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.125 5.85938H0.78125C0.349766 5.85938 0 6.20914 0 6.64062V16.4062C0 16.8377 0.349766 17.1875 0.78125 17.1875H3.125C3.55648 17.1875 3.90625 16.8377 3.90625 16.4062V6.64062C3.90625 6.20914 3.55648 5.85938 3.125 5.85938Z"
            fill="#2A2B2A"
          />
          <path
            d="M13.1694 5.85938C12.5679 5.85938 12.1832 5.21832 12.4663 4.6875L13.8895 2.01902C14.3772 1.10449 13.7145 0 12.6781 0C12.3139 0 11.9648 0.144648 11.7073 0.402109L7.16527 4.9441C6.57926 5.53016 6.25 6.325 6.25 7.15379V14.0625C6.25 15.7884 7.6491 17.1875 9.375 17.1875H15.8455C16.912 17.1875 17.8441 16.4674 18.1133 15.4354L19.9327 8.46098C19.9774 8.28977 20 8.11355 20 7.93664C20 6.78941 19.07 5.85938 17.9227 5.85938H13.1694Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Date Added",
      icon: (
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
      ),
    },
    {
      name: "Niche",
      icon: (
        <svg
          width="20"
          height="25"
          viewBox="0 0 20 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.39459 5.25409C9.5243 5.25409 9.5892 5.17839 9.62163 5.05948C9.95673 3.25406 9.93515 3.21084 11.8162 2.85405C11.9459 2.83247 12.0216 2.75677 12.0216 2.62702C12.0216 2.49731 11.9459 2.42162 11.8162 2.39999C9.94594 2.02166 10 1.97839 9.62163 0.194606C9.5892 0.0756929 9.5243 0 9.39459 0C9.26484 0 9.19999 0.0756929 9.16756 0.194606C8.78919 1.97839 8.85404 2.02166 6.97297 2.39999C6.85406 2.42162 6.76758 2.49731 6.76758 2.62702C6.76758 2.75677 6.85406 2.83247 6.97297 2.85405C8.85404 3.23247 8.83241 3.25406 9.16756 5.05948C9.19999 5.17839 9.26484 5.25409 9.39459 5.25409ZM4.16219 12.6919C4.36759 12.6919 4.50813 12.5622 4.52972 12.3676C4.91893 9.48108 5.01621 9.48108 8.00002 8.90815C8.19462 8.87568 8.33512 8.74597 8.33512 8.54057C8.33512 8.34596 8.19462 8.20542 8.00002 8.17299C5.01621 7.76219 4.90809 7.66487 4.52972 4.72433C4.50813 4.52977 4.36759 4.38922 4.16219 4.38922C3.96758 4.38922 3.82704 4.52977 3.8054 4.73517C3.44866 7.63244 3.29728 7.62165 0.335152 8.17299C0.140546 8.21626 0 8.34596 0 8.54057C0 8.75676 0.140546 8.87568 0.378372 8.90815C3.31891 9.3838 3.44866 9.45949 3.8054 12.346C3.82704 12.5622 3.96758 12.6919 4.16219 12.6919ZM11.4919 24.6595C11.773 24.6595 11.9784 24.4541 12.0324 24.1622C12.8 18.2378 13.6324 17.3406 19.4919 16.6919C19.7946 16.6595 20 16.4324 20 16.1514C20 15.8703 19.7946 15.654 19.4919 15.6108C13.6324 14.9622 12.8 14.0649 12.0324 8.14056C11.9784 7.84868 11.773 7.65407 11.4919 7.65407C11.2108 7.65407 11.0054 7.84868 10.9622 8.14056C10.1946 14.0649 9.35137 14.9622 3.50268 15.6108C3.1892 15.654 2.9838 15.8703 2.9838 16.1514C2.9838 16.4324 3.1892 16.6595 3.50268 16.6919C9.34054 17.4595 10.1513 18.2487 10.9622 24.1622C11.0054 24.4541 11.2108 24.6595 11.4919 24.6595Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
  ];

  const STAR_COUNT = 5;

  // Function to generate star rating SVG elements based on a given value

  const rating = (value: number) => {
    // Create an array of length STAR_COUNT, each element is a default (empty) star SVG

    const stars = Array.from({ length: STAR_COUNT }, () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0225353 7.23255C0.0764637 7.07602 0.213829 6.96299 0.377325 6.94122L6.67488 6.10642L9.61063 0.221093C9.75672 -0.0736975 10.2428 -0.0736975 10.3889 0.221093L13.3246 6.10646L19.6222 6.94126C19.7857 6.96299 19.9239 7.07606 19.9769 7.23259C20.03 7.38911 19.99 7.56215 19.8726 7.67954L15.2542 12.2979L16.5125 18.5911C16.5447 18.7546 16.4821 18.9207 16.3499 19.0224C16.2177 19.1233 16.0386 19.1398 15.8916 19.0659L9.99929 16.1197L4.10696 19.0659C4.0452 19.0963 3.97913 19.112 3.91305 19.112C3.81999 19.112 3.72608 19.0815 3.64871 19.0224C3.51742 18.9216 3.45391 18.7546 3.48611 18.5911L4.74439 12.2979L0.12603 7.67958C0.0103874 7.563 -0.0296402 7.38997 0.0225353 7.23255ZM3.84873 8.94129L6.63314 11.7266L5.91226 15.331C5.88096 15.391 5.86355 15.4589 5.86355 15.5311C5.86355 15.7711 6.05835 15.9659 6.29836 15.9659H6.31576C6.38184 15.9659 6.44795 15.9502 6.51056 15.9198L10.0011 14.1754L13.4916 15.9198C13.6403 15.9937 13.8186 15.978 13.9499 15.8763C14.0812 15.7754 14.1447 15.6084 14.1125 15.445L13.369 11.7257L16.1534 8.94043C16.2708 8.82304 16.3108 8.65 16.2578 8.49347C16.2038 8.33695 16.0665 8.22392 15.903 8.20215L12.1829 7.70909L10.3906 4.11769C10.2446 3.8229 9.75847 3.8229 9.61238 4.11769L7.82016 7.70909L4.10007 8.20215C3.93657 8.22388 3.79831 8.33695 3.74528 8.49347C3.69135 8.65086 3.73134 8.82389 3.84873 8.94129Z"
          fill="#E1C655"
        />
      </svg>
    ));
    let i;
    for (i = 0; i < value; i++) {
      // this will loop Math.floor(value) times
      stars[i] = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.85846 0.00390625L10.738 5.3874L15.8711 6.13858L12.4908 9.89451V15.278L7.85846 13.2748L2.85056 14.652L4.22773 9.89451L0.722199 6.13858L5.10411 5.01181L7.85846 0.00390625Z"
            fill="#E1C655"
          />
        </svg>
      );
    }

    if (value % 1 != 0)
      // if value is a decimal, add a half star
      stars[i - 1] = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0225353 7.23255C0.0764637 7.07602 0.213829 6.96299 0.377325 6.94122L6.67488 6.10642L9.61063 0.221093C9.75672 -0.0736975 10.2428 -0.0736975 10.3889 0.221093L13.3246 6.10646L19.6222 6.94126C19.7857 6.96299 19.9239 7.07606 19.9769 7.23259C20.03 7.38911 19.99 7.56215 19.8726 7.67954L15.2542 12.2979L16.5125 18.5911C16.5447 18.7546 16.4821 18.9207 16.3499 19.0224C16.2177 19.1233 16.0386 19.1398 15.8916 19.0659L9.99929 16.1197L4.10696 19.0659C4.0452 19.0963 3.97913 19.112 3.91305 19.112C3.81999 19.112 3.72608 19.0815 3.64871 19.0224C3.51742 18.9216 3.45391 18.7546 3.48611 18.5911L4.74439 12.2979L0.12603 7.67958C0.0103874 7.563 -0.0296402 7.38997 0.0225353 7.23255ZM9.56538 13.6892C9.56538 13.8536 9.65844 14.0049 9.80539 14.0779L13.4898 15.9197C13.5516 15.9502 13.6176 15.9658 13.6846 15.9658C13.7777 15.9658 13.8716 15.9354 13.949 15.8763C14.0803 15.7754 14.1438 15.6084 14.1116 15.445L13.3681 11.7257L16.1525 8.94043C16.2699 8.82304 16.3099 8.65 16.2569 8.49347C16.2029 8.33695 16.0656 8.22392 15.9021 8.20215L12.182 7.70909L10.3898 4.11769C10.3002 3.93683 10.0976 3.84291 9.90106 3.88811C9.70365 3.93422 9.56538 4.10986 9.56538 4.31159V13.6892Z"
            fill="#E1C655"
          />
        </svg>
      );

    return <div className="rating">{stars}</div>;
  };

  // data to show in the table
  const emailLists = [
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      Subscription: "Subscribed",
      Source: "Twitter",
      Brand: "Subscribed",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
  ];

  return (
    <>
      <div className={`${styles.listDetails} pt-[1.5vw] w-full`}>
        <div
          className=" flex items-center gap-[0.6vw] w-fit mb-[2.3vw] cursor-pointer"
          onClick={() => {
            router.back();
          }}
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
          <h3>Street Politics</h3>
          <svg
            width="1"
            height="41"
            viewBox="0 0 1 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.5"
              y1="41"
              x2="0.500002"
              y2="-2.18557e-08"
              stroke="#2A2B2A"
            />
          </svg>
          <h3>Subscribed</h3>
        </div>
        <div className=" mb-[1.5vw] flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <div>
              {/* Sources */}
              <h5 className=" mb-[1vh] font-semibold">Sources</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for Sources */}
                <CustomSelectInput
                  options={["All", ...emailLists.map((e, i) => e.Source)]}
                />
              </div>
            </div>
            <div>
              {/* Niche */}
              <h5 className=" mb-[1vh] font-semibold">Niche</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for Niche */}
                <CustomSelectInput
                  options={["All", ...emailLists.map((e, i) => e.Niche)]}
                />
              </div>
            </div>
            <div>
              <h5 className=" mb-[1vh] font-semibold">Ratings</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>{sorting}</span>
                <svg
                  onClick={() => {
                    sorting == "Ascend"
                      ? setSorting("Descend")
                      : setSorting("Ascend");
                  }}
                  className="cursor-pointer"
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
          <CustomBtn
            onClick={() => {
              if (!btnSwapped) {
                setCheckboxHidden(false);
                setBtnSwapped(true);
              } else if (btnSwapped) {
                setIsOpen(true);
              }
            }}
            paddingVal="py-[0.45vw] px-[1vw]"
            btnColor={`${btnSwapped ? "black" : "white"}`}
            icon={
              !btnSwapped ? (
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
                    d="M1.15328 12.1742L0.0402878 15.1421C-0.00245068 15.2563 -0.0114093 15.3804 0.0144821 15.4996C0.0403735 15.6188 0.100021 15.728 0.186299 15.8142C0.272578 15.9004 0.381843 15.9599 0.501043 15.9857C0.620243 16.0114 0.744342 16.0023 0.858517 15.9595L3.82566 14.8465C4.16527 14.7193 4.47372 14.5209 4.73028 14.2646L13.3251 5.66993C13.3251 5.66993 13.0252 4.77125 12.1274 3.87256C11.2295 2.97472 10.33 2.67488 10.33 2.67488L1.73519 11.2696C1.47889 11.5261 1.28048 11.8346 1.15328 12.1742ZM11.5285 1.47635L12.7 0.30493C12.91 0.09487 13.1904 -0.0389586 13.4835 0.0101684C13.896 0.0779297 14.527 0.282907 15.1216 0.87836C15.7171 1.47381 15.9221 2.10399 15.9898 2.51649C16.039 2.80956 15.9051 3.08992 15.6951 3.29998L14.5228 4.4714C14.5228 4.4714 14.2238 3.57356 13.3251 2.67573C12.4272 1.7762 11.5285 1.47635 11.5285 1.47635Z"
                    fill="#2A2B2A"
                  />
                </svg>
              ) : (
                <svg
                  className="hidden"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.15328 12.1742L0.0402878 15.1421C-0.00245068 15.2563 -0.0114093 15.3804 0.0144821 15.4996C0.0403735 15.6188 0.100021 15.728 0.186299 15.8142C0.272578 15.9004 0.381843 15.9599 0.501043 15.9857C0.620243 16.0114 0.744342 16.0023 0.858517 15.9595L3.82566 14.8465C4.16527 14.7193 4.47372 14.5209 4.73028 14.2646L13.3251 5.66993C13.3251 5.66993 13.0252 4.77125 12.1274 3.87256C11.2295 2.97472 10.33 2.67488 10.33 2.67488L1.73519 11.2696C1.47889 11.5261 1.28048 11.8346 1.15328 12.1742ZM11.5285 1.47635L12.7 0.30493C12.91 0.09487 13.1904 -0.0389586 13.4835 0.0101684C13.896 0.0779297 14.527 0.282907 15.1216 0.87836C15.7171 1.47381 15.9221 2.10399 15.9898 2.51649C16.039 2.80956 15.9051 3.08992 15.6951 3.29998L14.5228 4.4714C14.5228 4.4714 14.2238 3.57356 13.3251 2.67573C12.4272 1.7762 11.5285 1.47635 11.5285 1.47635Z"
                    fill="#2A2B2A"
                  />
                </svg>
              )
            }
            word={`${btnSwapped ? "Save List" : "Modify List"}`}
          />
        </div>
        <div
          className={`${styles.table} w-full rounded-xl overflow-y-hidden mb-1 `}
        >
          {/* Header section of the table */}
          <div className={`${styles.tableHead} w-full`}>
            <ul className="flex justify-between items-center border-b-2 border-b-[var(--dark)] w-full">
              <li
                className={`${
                  checkboxHidden == true ? "hidden" : "flex"
                }`}
                id="main"
                onClick={() => {
                  console.log("yes");

                  document
                    .querySelectorAll(".checking input")
                    .forEach((e: any) => {
                      console.log(e);
                      if (
                        !(document.querySelector("#main input") as any)?.checked
                      )
                        e.checked = false;
                      else e.checked = true;
                    });
                }}
              >
                <CustomCheckBox accentColor="#E1C655" />
              </li>
              {/* Mapping over the dataHeadEmailCleaning array to create table header columns */}
              {headEmailList.map((e, i) => (
                // Each header item has a minimum width and is evenly distributed
                <li className={`w-[14.28%] flex`} key={i}>
                  {e.icon}
                  {e.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Body section of the table with scrollable content */}
          <div
            className={`${styles.tableBody}  overflow-y-scroll h-[53vh]`}
          >
            {/* Mapping over the dataEmailCleaning array to create table rows */}
            {emailLists.map((e, i) => (
              // Each row with styling applied and a border at the bottom
              <div className="">
                <ul
                  className="flex justify-between items-center border-b-2 border-b-[#2A2B2A4A] "
                  key={i}
                >
                  <li
                    className={`checking ${
                      checkboxHidden == true ? "hidden" : "flex"
                    }`}
                  >
                    <CustomCheckBox accentColor="#E1C655" />
                  </li>

                  {/* emailAddress column */}
                  <li className={`w-[14.28%] flex`}>{e.emailAddress}</li>
                  {/*Subscription column with specific background color */}
                  <li className={`w-[14.28%] flex`}>
                    <span className="py-1 px-2 rounded-sm bg-[#E1C655B2] ">
                      {e.Subscription}
                    </span>
                  </li>
                  {/* Source column */}
                  <li className={`w-[14.28%] flex`}>
                    <span className="py-1 px-2 rounded-sm bg-[#E9313EB2] text-white">
                      {e.Source}
                    </span>
                  </li>
                  {/* Brand column with specific background color */}

                  <li className={`w-[14.28%] flex`}>
                    <span className="py-1 px-2 rounded-sm bg-[#E1C655B2] ">
                      {e.Brand}
                    </span>
                  </li>
                  {/* Ratings column */}
                  <li className={`w-[14.28%] flex`}>
                    {rating(e.contactRating)}
                  </li>
                  {/* Date column */}
                  <li className={`w-[14.28%] flex`}>{e.dateAdded}</li>
                  {/* Niche column */}

                  <li className={`w-[14.28%] flex`}>{e.Niche}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 justify-center items-center bg-[#FFFFFB] bg-opacity-[58%] z-20 flex ${
          styles.overlay
        } ${
          isOpen ? "flex" : "hidden" // Conditional rendering based on isOpen state
        }`}
      >
        <div
          className={`${styles.overlayBox} px-[1vw] py-[2vw] rounded-xl bg-[#FFFFFB] w-[19vw]`}
        >
          <h5 className=" px-[0.3vw] pb-[1.2vw] border-b-[1px] border-b-[#2A2B2A] mb-[1.1vw] text-center">
            Genius has detected{" "}
            <hr className=" bg-transparent border-transparent border-0" /> some
            email duplications
          </h5>
          <div className=" px-[0.5vw] pb-[1.2vw] border-b-[1px] border-b-[#2A2B2A] mb-[1.1vw]">
            <h6 className=" mb-[0.7vw] underline">Duplicated Email</h6>
            <p>johndoe@gmail.com</p>
            <p>johndoe@gmail.com</p>
            <p>johndoe@gmail.com</p>
            <p>johndoe@gmail.com</p>
          </div>
          <div className=" flex gap-2 items-center justify-center">
            <CustomBtn
              onClick={() => {
                setIsOpen(false);
              }}
              word="Ignore"
              btnColor="white"
            />
            <CustomBtn word="Replace Duplicate" btnColor="black" paddingVal="py-[0.5vw] px-[0.3vw]"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
