"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./SideNav.module.css";
import logo_image from "../../../public/assets/logo.svg";
import logo_white_image from "../../../public/assets/logo white.svg";
import logo_text_image from "../../../public/assets/logo text.svg";
import Image from "next/image";
import Link from "next/link";
import CustomSelectInput from "../CustomSelectInput/CustomSelectInput";
import { useRouter } from "next/navigation";
import $ from "jquery";
import { globalContext } from "@/app/_context/store";

const rolsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" fill="none">
    <path
      d="M20.5001 9.28571H11.2144V0H9.7858V9.28571H0.500084V10.7143H9.7858V20H11.2144V10.7143H20.5001V9.28571Z"
      fill="#FFFFFB"
    />
    <path
      d="M6.92865 20H1.21437C1.0926 20 0.972851 19.9689 0.866493 19.9096C0.760135 19.8503 0.6707 19.7648 0.606682 19.6612C0.542664 19.5577 0.506189 19.4394 0.500721 19.3178C0.495253 19.1961 0.520974 19.0751 0.57544 18.9662L3.43258 13.2519C3.49852 13.1412 3.59207 13.0496 3.70407 12.9859C3.81607 12.9223 3.94269 12.8888 4.07151 12.8888C4.20034 12.8888 4.32695 12.9223 4.43896 12.9859C4.55096 13.0496 4.64451 13.1412 4.71044 13.2519L7.56758 18.9662C7.62205 19.0751 7.64777 19.1961 7.6423 19.3178C7.63684 19.4394 7.60036 19.5577 7.53634 19.6612C7.47232 19.7648 7.38289 19.8503 7.27653 19.9096C7.17017 19.9689 7.05042 20 6.92865 20ZM2.37023 18.5714H5.7728L4.07151 15.1688L2.37023 18.5714Z"
      fill="#FFFFFB"
    />
    <path
      d="M19.0715 7.14286H14.7858C14.4071 7.14242 14.0439 6.99177 13.7761 6.72396C13.5083 6.45614 13.3577 6.09303 13.3572 5.71429V1.42857C13.3577 1.04982 13.5083 0.686714 13.7761 0.418899C14.0439 0.151084 14.4071 0.00043481 14.7858 0H19.0715C19.4503 0.00043481 19.8134 0.151084 20.0812 0.418899C20.349 0.686714 20.4996 1.04982 20.5001 1.42857V5.71429C20.4996 6.09303 20.349 6.45614 20.0812 6.72396C19.8134 6.99177 19.4503 7.14242 19.0715 7.14286ZM14.7858 1.42857V5.71429H19.0722L19.0715 1.42857H14.7858Z"
      fill="#FFFFFB"
    />
    <path
      d="M4.07151 7.14286C3.36515 7.14286 2.67465 6.9334 2.08733 6.54096C1.50002 6.14853 1.04226 5.59075 0.771944 4.93816C0.501631 4.28556 0.430905 3.56747 0.568709 2.87468C0.706514 2.18189 1.04666 1.54552 1.54613 1.04605C2.04561 0.546576 2.68197 0.20643 3.37476 0.0686256C4.06755 -0.0691788 4.78565 0.00154743 5.43824 0.27186C6.09083 0.542173 6.64861 0.999932 7.04105 1.58725C7.43348 2.17457 7.64294 2.86507 7.64294 3.57143C7.64183 4.51829 7.26519 5.42605 6.59566 6.09558C5.92613 6.76511 5.01837 7.14174 4.07151 7.14286ZM4.07151 1.42857C3.6477 1.42857 3.2334 1.55425 2.88101 1.78971C2.52861 2.02517 2.25396 2.35984 2.09177 2.75139C1.92958 3.14295 1.88715 3.57381 1.96983 3.98948C2.05251 4.40515 2.2566 4.78698 2.55629 5.08666C2.85597 5.38634 3.23779 5.59043 3.65346 5.67311C4.06914 5.7558 4.49999 5.71336 4.89155 5.55117C5.28311 5.38898 5.61777 5.11433 5.85323 4.76194C6.08869 4.40955 6.21437 3.99525 6.21437 3.57143C6.21375 3.0033 5.98778 2.45862 5.58605 2.05689C5.18433 1.65516 4.63964 1.4292 4.07151 1.42857Z"
      fill="#FFFFFB"
    />
    <path d="M4 15L6.16506 18.75H1.83494L4 15Z" fill="#FFFFFB" />
    <path
      d="M6.5 3.5C6.5 4.88071 5.38071 6 4 6C2.61929 6 1.5 4.88071 1.5 3.5C1.5 2.11929 2.61929 1 4 1C5.38071 1 6.5 2.11929 6.5 3.5Z"
      fill="#FFFFFB"
    />
    <path d="M14.5 1H19.5V6H14.5V1Z" fill="#FFFFFB" />
    <path
      d="M13.9894 17.2489C13.3369 16.9004 13.3369 16.0996 13.9894 15.7511L18.8793 13.1397C19.5817 12.7646 20.5 13.1889 20.5 13.8886V19.1114C20.5 19.8111 19.5817 20.2354 18.8793 19.8603L13.9894 17.2489Z"
      fill="#FFFFFB"
    />
  </svg>
);

const rols = [
  "Content Writer",
  "Video Editing",
  "Social Media",
  "Administrative",
  "Customer Service",
  "Creative",
  "HR",
  "Accounting",
  "Newsletter",
  "Out Reach",
  "SEO",
  "OP",
];

const SideNav = ({
  sideNavLinks,
  isSideNavOpen,
  setIsSideNavOpen,
  setCurrentPage,
}: {
  sideNavLinks: {
    name: string;
    path?: string;
    icon: any;
    subLinks?: { name: string; path: string }[];
  }[];
  isSideNavOpen: boolean;
  setIsSideNavOpen: any;
  setCurrentPage: any;
}) => {
  const { decodedToken } = useContext(globalContext);

  // current role
  const [SelectedRole, setSelectedRole] = useState<string | number>("");
  const router = useRouter();

  // function that get role value from select option by send it as a prop
  const getRole = (value: string | number) => {
    setSelectedRole(value);
  };

  // function that get current
  const handleCurrentPageTitle = (name: any) => {
    setCurrentPage(name);
  };

  const handleToggleSubMenu = (e: any) => {
    console.log($(e.target).parents(`.${styles.has_sub_menu}`));
    $(`.${styles.has_sub_menu}`)
      .not($(e.target).parents(`.${styles.has_sub_menu}`))
      .removeClass(`${styles.open}`);
    $(e.target)
      .parents(`.${styles.has_sub_menu}`)
      .toggleClass(`${styles.open}`);
  };

  useEffect(() => {
    if (SelectedRole === "Content Creator") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/content-creator/dashboard");
    } else if (SelectedRole === "Video Editor") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/video-editor/dashboard");
    } else if (SelectedRole === "Social Media") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/social-media/dashboard");
    } else if (SelectedRole === "Administrative") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/administrative/dashboard");
    } else if (SelectedRole === "Customer Service") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/customer-service/dashboard");
    } else if (SelectedRole === "Creative") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/creative/dashboard");
    } else if (SelectedRole === "HR") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/hr/dashboard");
    } else if (SelectedRole === "Accounting") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/accounting/dashboard");
    } else if (SelectedRole === "Newsletter") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/newsletter/dashboard");
    } else if (SelectedRole === "Out Reach") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/outreach/dashboard");
    } else if (SelectedRole === "SEO") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/seo/dashboard");
    } else if (SelectedRole === "OP") {
      localStorage.setItem("selected-role", SelectedRole);
      router.push("/op/dashboard");
    }
    // console.log(`SelectedRole:`, SelectedRole);
  }, [SelectedRole]);

  return (
    <div
      className={`${styles.side_Nav} ${isSideNavOpen ? "" : styles.close}`}
      onMouseEnter={() => setIsSideNavOpen(!isSideNavOpen)}
      onMouseLeave={() => setIsSideNavOpen(!isSideNavOpen)}
    >
      <div>
        <div
          className={styles.user_info + " flex items-center justify-between"}
        >
          <div
            className={`${styles.avatar_logo} flex items-center gap-[0.6vw]`}
          >
            <div className={styles.avatar + " " + styles.active}></div>
            <div className="flex flex-col">
              <h6>John Doe</h6>
              <p>
                {typeof window !== "undefined" &&
                localStorage.getItem("selected-role") === null
                  ? "Content Creator"
                  : localStorage.getItem("selected-role")}
              </p>
            </div>
          </div>
          <div className={styles.logo}>
            <Image src={logo_image} alt="logo" />
            <Image src={logo_white_image} alt="logo" />
          </div>
        </div>

        <ul className={styles.side_nav_links + " space-y-[0.5vw]"}>
          <li>
            <Link
              href={sideNavLinks[0].path ? sideNavLinks[0].path : ""}
              onClick={() => handleCurrentPageTitle(sideNavLinks[0].name)}
            >
              {sideNavLinks[0].icon}
              <p>{sideNavLinks[0].name}</p>
            </Link>
          </li>
        </ul>

        <div className={styles.line}></div>

        <CustomSelectInput
          options={rols.filter((role: any) => role === decodedToken.department)}
          icon={rolsIcon}
          theme="dark"
          whenSideNavClosed={!isSideNavOpen}
          getValue={getRole}
        />

        <div className={styles.line}></div>
        <ul className={styles.side_nav_links + " space-y-[0.4vw]"}>
          {sideNavLinks.slice(1).map((ele) => (
            <li
              key={ele.name}
              className={ele.subLinks ? styles.has_sub_menu : ""}
              onClick={(e) => handleToggleSubMenu(e)}
            >
              <Link
                href={ele.path ? ele.path : ""}
                onClick={() =>
                  handleCurrentPageTitle((prev: any) =>
                    ele.path ? ele.name : prev
                  )
                }
              >
                {ele.icon}
                <p>{ele.name}</p>
                {ele.subLinks && (
                  <svg
                    className={styles.toggleIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="9"
                    viewBox="0 0 18 9"
                    fill="none"
                  >
                    <path
                      d="M0.900542 9H17.101C17.265 8.99966 17.4258 8.96945 17.566 8.91262C17.7062 8.85579 17.8206 8.7745 17.8968 8.67749C17.973 8.58049 18.0081 8.47144 17.9984 8.36209C17.9887 8.25274 17.9345 8.14723 17.8417 8.05692L9.74149 0.242983C9.40578 -0.0809944 8.59756 -0.0809944 8.26095 0.242983L0.160721 8.05692C0.0669606 8.14705 0.0119774 8.25261 0.00174508 8.36214C-0.00848727 8.47167 0.0264226 8.58098 0.102682 8.67819C0.178941 8.7754 0.293633 8.8568 0.434296 8.91353C0.57496 8.97027 0.736215 9.00017 0.900542 9Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                )}
              </Link>
              <ul className={styles.sub_menu_links}>
                {ele.subLinks
                  ? ele.subLinks.map((ele) => (
                      <li>
                        <Link
                          href={ele.path}
                          onClick={() => handleCurrentPageTitle(ele.name)}
                        >
                          {ele.name}
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.logo_toggle_side_nav}>
        <Image src={logo_text_image} alt="logo" />
        {/* <button onClick={() => setIsSideNavOpen(!isSideNavOpen)}>
                    <svg viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-0.000110561 1.39996C-0.000110629 0.626759 0.62665 -1.71737e-06 1.39985 -1.78496e-06C2.17304 -1.85256e-06 2.7998 0.626759 2.7998 1.39996L2.7998 23.7993C2.7998 24.5724 2.17304 25.1992 1.39985 25.1992C0.626652 25.1992 -0.000108535 24.5724 -0.000108603 23.7993L-0.000110561 1.39996Z" fill="#FFFFFB" />
                        <path d="M16.3893 4.60971C16.936 5.1564 16.936 6.04285 16.3893 6.58953L11.7794 11.1995L26.5991 11.1994C27.3722 11.1994 27.999 11.8262 27.999 12.5994C27.999 13.3726 27.3722 13.9994 26.5991 13.9994L11.7794 13.9994L16.3893 18.6093C16.936 19.156 16.936 20.0424 16.3893 20.5891C15.8426 21.1358 14.9562 21.1358 14.4095 20.5891L7.40972 13.5893C6.86304 13.0426 6.86304 12.1562 7.40972 11.6095L14.4095 4.60971C14.9562 4.06303 15.8426 4.06303 16.3893 4.60971Z" fill="#FFFFFB" />
                    </svg>
                </button> */}
      </div>
    </div>
  );
};

export default SideNav;
