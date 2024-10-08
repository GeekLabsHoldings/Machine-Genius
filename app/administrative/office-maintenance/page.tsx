"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./office-maintenance.module.css";
import AdministrativeCard from "../../_components/Administrative/01OfficeMaintenance/AdministrativeCard";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const annualOptions: string[] = ["Daily", "Weekly", "Monthly", "Yearly"];
const annualOptions: string[] = ["No filters available!"];
interface Item {
  id: string;
  title: string; // The title of the item
  info?: any; // Optional additional information about the item
}
enum RoomStatus {
  CheckList = "CheckList",
  Done = "Done",
  Missed = "Missed",
}
enum SupplyStatus {
  CheckList = "CheckList",
  Available = "Available",
  Repurchase = "Repurchase",
}

const missingIcon = (
  <svg
    className="w-[--18px] h-[--19px]"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 9.35156C0.5 4.381 4.30558 0.351562 9 0.351562C13.6944 0.351562 17.5 4.381 17.5 9.35156C17.5 14.3221 13.6944 18.3516 9 18.3516C4.30558 18.3516 0.5 14.3221 0.5 9.35156ZM8.15 10.2516C8.15 10.7486 8.53055 11.1516 9 11.1516C9.46945 11.1516 9.85 10.7486 9.85 10.2516V5.75156C9.85 5.25451 9.46945 4.85156 9 4.85156C8.53055 4.85156 8.15 5.25451 8.15 5.75156V10.2516ZM9.85 12.9415C9.85 12.4444 9.46945 12.0415 9 12.0415C8.53055 12.0415 8.15 12.4444 8.15 12.9415V12.9516C8.15 13.4486 8.53055 13.8516 9 13.8516C9.46945 13.8516 9.85 13.4486 9.85 12.9516V12.9415Z"
      fill="#E9313E"
    />
  </svg>
);

const checkListicon = (
  <svg
    width="30"
    height="33"
    viewBox="0 0 30 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99201 0L7.9912 0.500201V2.0008H9.99201V0ZM9.99201 2.0008V4.00161H7.9912V2.0008C5.4742 2.03081 3.63146 1.94078 2.12685 2.77111C1.37255 3.18728 0.77431 3.89156 0.446179 4.76791C0.116046 5.64626 0 6.68868 0 8.00321V24.0096C0 25.3262 0.116046 26.3686 0.446179 27.2449C0.77431 28.1253 1.37255 28.8236 2.12685 29.2397C3.63146 30.0701 5.4742 29.984 7.9912 30.012H14.0016V28.0112H7.9912C5.47019 27.9832 3.81553 27.8912 3.08324 27.489C2.71709 27.2849 2.503 27.0629 2.30893 26.5426C2.11285 26.0224 1.9888 25.1961 1.9888 24.0096V14.0056C1.9888 12.8211 2.11485 11.9948 2.30893 11.4746C2.505 10.9544 2.71709 10.7303 3.08324 10.5282C3.81753 10.1241 5.4742 10.034 8.00321 10.004H19.996C22.517 10.034 24.1717 10.1241 24.904 10.5282C25.2721 10.7303 25.4842 10.9544 25.6783 11.4746C25.8744 11.9948 25.9984 14.0056 25.9984 14.0056V16.0064H27.9992V8.00321C27.9992 6.68868 27.8792 5.64626 27.549 4.76791C27.2466 3.92402 26.6527 3.21589 25.8744 2.77111C24.3678 1.94078 22.525 2.03081 20.008 2.0008V4.00161H18.0072V2.0008H9.99201ZM17.9952 2.0008H19.996V0L17.9952 0.500201V2.0008Z"
      fill="#2A2B2A"
    />
    <path
      d="M22.995 18.0078C21.1377 18.0078 19.3565 18.7456 18.0433 20.0589C16.73 21.3722 15.9922 23.1534 15.9922 25.0106C15.9922 26.8679 16.73 28.6491 18.0433 29.9624C19.3565 31.2756 21.1377 32.0134 22.995 32.0134C24.8523 32.0134 26.6334 31.2756 27.9467 29.9624C29.26 28.6491 29.9978 26.8679 29.9978 25.0106C29.9978 23.1534 29.26 21.3722 27.9467 20.0589C26.6334 18.7456 24.8523 18.0078 22.995 18.0078ZM21.9946 20.0086H23.9954V22.3456C23.9954 23.0438 23.9634 23.6821 23.9014 24.2603C23.8413 24.8406 23.7633 25.4228 23.6713 26.011H22.3387C22.2354 25.4305 22.152 24.8466 22.0886 24.2603C22.0239 23.6241 21.9925 22.985 21.9946 22.3456V20.0086ZM22.995 28.0118C23.2603 28.0118 23.5148 28.1172 23.7024 28.3048C23.89 28.4924 23.9954 28.7469 23.9954 29.0122C23.9954 29.2775 23.89 29.532 23.7024 29.7196C23.5148 29.9072 23.2603 30.0126 22.995 30.0126C22.7297 30.0126 22.4752 29.9072 22.2876 29.7196C22.1 29.532 21.9946 29.2775 21.9946 29.0122C21.9946 28.7469 22.1 28.4924 22.2876 28.3048C22.4752 28.1172 22.7297 28.0118 22.995 28.0118Z"
      fill="#31B2E9"
    />
  </svg>
);

const doneIcon = (
  <svg
    width="31"
    height="32"
    viewBox="0 0 31 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.5577 31.7463C27.3931 31.7463 30.5022 28.6372 30.5022 24.8019C30.5022 23.3872 30.0792 22.0713 29.3527 20.9739L23.8316 27.1084C23.2972 27.7023 22.3978 27.79 21.7587 27.3106L19.2367 25.4191C18.8958 25.1634 18.8267 24.6798 19.0824 24.3389C19.3381 23.998 19.8217 23.9289 20.1627 24.1846L22.6846 26.076L28.3525 19.7784C27.106 18.5883 25.4172 17.8574 23.5577 17.8574C19.7224 17.8574 16.6133 20.9666 16.6133 24.8019C16.6133 28.6372 19.7224 31.7463 23.5577 31.7463Z"
      fill="#5FA85B"
    />
    <path
      d="M10.4087 0L8.4246 0.496032V1.98413H10.4087V0ZM10.4087 1.98413V3.96825H8.4246V1.98413C5.92857 2.01389 4.10119 1.9246 2.60913 2.74802C1.86111 3.16071 1.26786 3.85913 0.94246 4.72817C0.615079 5.59921 0.5 6.63294 0.5 7.93651V23.8095C0.5 25.1151 0.615079 26.1488 0.94246 27.0179C1.26786 27.8909 1.86111 28.5833 2.60913 28.996C4.10119 29.8194 5.92857 29.7341 8.4246 29.7619H14.3849V27.7778H8.4246C5.9246 27.75 4.28373 27.6587 3.55754 27.2599C3.19444 27.0575 2.98214 26.8373 2.78968 26.3214C2.59524 25.8056 2.47222 24.9861 2.47222 23.8095V13.8889C2.47222 12.7143 2.59722 11.8948 2.78968 11.379C2.98413 10.8631 3.19444 10.6409 3.55754 10.4405C4.28571 10.0397 5.92857 9.9504 8.43651 9.92063H20.3294C22.8294 9.9504 24.4702 10.0397 25.1964 10.4405C25.5615 10.6409 25.7718 10.8631 25.9643 11.379C26.1587 11.8948 26.2817 13.8889 26.2817 13.8889V15.873H28.2659V7.93651C28.2659 6.63294 28.1468 5.59921 27.8194 4.72817C27.5195 3.89132 26.9306 3.18909 26.1587 2.74802C24.6647 1.9246 22.8373 2.01389 20.3413 1.98413V3.96825H18.3571V1.98413H10.4087ZM18.3452 1.98413H20.3294V0L18.3452 0.496032V1.98413Z"
      fill="#2A2B2A"
    />
  </svg>
);

const missedIcon = (
  <svg
    width="30"
    height="32"
    viewBox="0 0 30 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.38712 0L7.50744 0.46992V1.87968H9.38712V0ZM9.38712 1.87968V3.75936H7.50744V1.87968C5.1428 1.90788 3.41162 1.82329 1.9981 2.60336C1.28946 2.99433 0.727436 3.65598 0.419169 4.47928C0.109021 5.30446 0 6.28377 0 7.51872V22.5562C0 23.793 0.109021 24.7723 0.419169 25.5956C0.727436 26.4227 1.28946 27.0787 1.9981 27.4696C3.41162 28.2497 5.1428 28.1689 7.50744 28.1952H13.154V26.3155H7.50744C5.13904 26.2892 3.58455 26.2027 2.89659 25.8249C2.55261 25.6332 2.35148 25.4246 2.16915 24.9358C1.98494 24.4471 1.8684 23.6708 1.8684 22.5562V13.1578C1.8684 12.045 1.98682 11.2687 2.16915 10.78C2.35336 10.2912 2.55261 10.0807 2.89659 9.89088C3.58643 9.51118 5.1428 9.42659 7.51872 9.3984H18.7855C21.1539 9.42659 22.7084 9.51118 23.3964 9.89088C23.7422 10.0807 23.9415 10.2912 24.1238 10.78C24.308 11.2687 24.4246 13.1578 24.4246 13.1578V15.0374H26.3042V7.51872C26.3042 6.28377 26.1915 5.30446 25.8813 4.47928C25.5972 3.68647 25.0392 3.02121 24.308 2.60336C22.8926 1.82329 21.1614 1.90788 18.7968 1.87968V3.75936H16.9171V1.87968H9.38712ZM16.9058 1.87968H18.7855V0L16.9058 0.46992V1.87968Z"
      fill="#2A2B2A"
    />
    <path
      d="M21.9437 16.3369C20.1374 16.4617 18.4413 17.24 17.1637 18.5176C14.2267 21.4546 14.2267 26.2125 17.1637 29.1495C20.1007 32.0865 24.8586 32.0865 27.7956 29.1495C30.7326 26.2125 30.7326 21.4546 27.7956 18.5176C26.2537 16.9757 24.117 16.1753 21.9437 16.3369ZM19.8217 19.2886C20.2989 19.2886 20.7835 19.4795 21.1507 19.8466L22.4797 21.1756L23.8087 19.8466C24.5429 19.1123 25.7324 19.1123 26.4666 19.8466C27.2009 20.5808 27.2009 21.7703 26.4666 22.5046L25.1376 23.8336L26.4666 25.1626C27.2009 25.8968 27.2009 27.0863 26.4666 27.8206C25.7324 28.5548 24.5429 28.5548 23.8087 27.8206L22.4797 26.4916L21.1507 27.8206C20.4164 28.5548 19.2269 28.5548 18.4927 27.8206C17.7584 27.0863 17.7584 25.8968 18.4927 25.1626L19.8217 23.8336L18.4927 22.5046C17.7584 21.7703 17.7584 20.5808 18.4927 19.8466C18.8598 19.4795 19.3444 19.2886 19.8217 19.2886Z"
      fill="#E9313E"
    />
  </svg>
);

export default function Page() {
  const { authState, handleSignOut } = useContext(globalContext);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [pageState, setPageState] = useState<any>({
    rooms: null,
    cleaningSupplies: null,
    foodSupplies: null,
  });

  async function handleDropRoomItem(item: Item, newStatus: RoomStatus) {
    if (!item.id || !newStatus) {
      console.error("Room ID or newStatus is missing");
      toast.error(
        "Unable to update room status. Room ID or newStatus is missing."
      );
      return;
    }
    await updateRoom(item.id, newStatus);
    await getRooms();
  }

  async function handleDropSupplyItem(item: Item, newStatus: SupplyStatus) {
    if (!item.id || !newStatus) {
      console.error("Supply ID or newStatus is missing");
      toast.error(
        "Unable to update supply status. Supply ID or newStatus is missing."
      );
      return;
    }
    await updateSupply(item.id, newStatus);
    await getCleaningAndFoodSupplies();
  }

  async function getRooms() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/rooms/get-rooms?limit=1000`,
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
      if (json && (json.CheckList || json.Missed || json.Done)) {
        setPageState((prevState: any) => ({
          ...prevState,
          rooms: json,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getRooms:", error);
    }
  }

  async function getCleaningAndFoodSupplies() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/supplies?type=${
          activeTab === 2 ? "Cleaning" : "Food"
        }`,
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
      if (
        json &&
        json.result &&
        (json.result.CheckList ||
          json.result.Available ||
          json.result.Repurchase)
      ) {
        setPageState((prevState: any) => ({
          ...prevState,
          ...(activeTab === 2
            ? { cleaningSupplies: json.result }
            : { foodSupplies: json.result }),
        }));
      } else if (
        json &&
        json.result &&
        !json.result.CheckList &&
        !json.result.Available &&
        !json.result.Repurchase
      ) {
        toast.error("No data available!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getRooms:", error);
    }
  }

  async function updateRoom(roomId: string, roomStatus: RoomStatus) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/rooms/update-room/${roomId}`,
        {
          method: "PUT",
          body: JSON.stringify({ typeStatus: roomStatus }),
          headers: {
            "Content-Type": "application/json",

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
      if (json) {
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getRooms:", error);
    }
  }

  async function updateSupply(supplyId: string, supplyStatus: SupplyStatus) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/supplies/${supplyId}`,
        {
          method: "PUT",
          body: JSON.stringify({ supplyStatus: supplyStatus }),
          headers: {
            "Content-Type": "application/json",

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
      if (json) {
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getRooms:", error);
    }
  }

  useEffect(() => {
    if (activeTab === 1) {
      getRooms();
    } else if (activeTab === 2 || activeTab === 3) {
      getCleaningAndFoodSupplies();
    }
  }, [activeTab]);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={`${styles.officeMaintenance}`}>
        {/* Container */}
        <div>
          {/* Tabs */}
          <div role="tablist" className={`${styles.tabs} flex`}>
            <a
              role="tab"
              className={`${styles.tab} ${
                activeTab === 1 ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              Office Cleaning
            </a>
            <a
              role="tab"
              className={`${styles.tab} ${
                activeTab === 2 ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(2)}
            >
              Cleaning Supplies
            </a>
            <a
              role="tab"
              className={`${styles.tab} ${
                activeTab === 3 ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(3)}
            >
              Food List
            </a>
          </div>

          {/* 1. Tab 1 Content */}
          {activeTab === 1 && (
            <div className={`${styles.tab1}`}>
              <h3 className={`${styles.cardsTitle} my-[--sy-33px]`}>
                Weekly Checklist
              </h3>

              {/* 1.1 Cards Container */}
              <div className="cards-container grid grid-cols-3 gap-[27px]">
                {/*  Card 1 */}
                <AdministrativeCard
                  icon={checkListicon}
                  addIcon={false}
                  title="Checklist"
                  onDrop={(item) =>
                    handleDropRoomItem(item, RoomStatus.CheckList)
                  }
                  items={
                    Array.isArray(pageState.rooms?.CheckList) &&
                    pageState.rooms?.CheckList.length > 0
                      ? pageState.rooms?.CheckList.map((item: any) => ({
                          id: item._id,
                          title: item.roomName,
                          ...(item.warning === true && { info: missingIcon }),
                          isDraggable: true,
                        }))
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />

                {/* Card 2 */}
                <AdministrativeCard
                  icon={doneIcon}
                  addIcon={false}
                  title="Done"
                  onDrop={(item) => handleDropRoomItem(item, RoomStatus.Done)}
                  items={
                    Array.isArray(pageState.rooms?.Done) &&
                    pageState.rooms?.Done.length > 0
                      ? pageState.rooms?.Done.map((item: any) => ({
                          id: item._id,
                          title: item.roomName,
                          ...(item.warning === true && { info: missingIcon }),
                        }))
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />

                {/* Card 3 */}
                <AdministrativeCard
                  onDrop={(item) => handleDropRoomItem(item, RoomStatus.Missed)}
                  icon={missedIcon}
                  addIcon={false}
                  title="Missed"
                  items={
                    Array.isArray(pageState.rooms?.Missed) &&
                    pageState.rooms?.Missed.length > 0
                      ? pageState.rooms?.Missed.map((item: any) => ({
                          id: item._id,
                          title: item.roomName,
                          ...(item.warning === true && { info: missingIcon }),
                        }))
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />
              </div>
            </div>
          )}

          {/* Tab 2 Content */}
          {activeTab === 2 && (
            <div className={`${styles.tab2}`}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col my-[--sy-33px] w-[393px]">
                  <h3 className={`${styles.cardsTitle} mb-[--sy-10px]`}>
                    Cleaning Supplies
                  </h3>
                  <CustomSelectInput
                    label="Weekly"
                    options={annualOptions}
                    hoverColor="hover:bg-[#31B2E9]"
                  />
                </div>

                <CustomBtn
                  btnColor="white"
                  word="Receipts Database"
                  paddingVal="py-[--12px] px-[--20px]"
                  href="/administrative/database"
                />
              </div>

              {/* 1.1 Cards Container */}
              <div className="cards-container grid grid-cols-3 gap-[27px]">
                {/*  Card 1 */}
                <AdministrativeCard
                  icon={checkListicon}
                  addIcon={false}
                  title="Checklist"
                  onDrop={(item) =>
                    handleDropSupplyItem(item, SupplyStatus.CheckList)
                  }
                  items={
                    Array.isArray(pageState.cleaningSupplies?.CheckList) &&
                    pageState.cleaningSupplies?.CheckList.length > 0
                      ? pageState.cleaningSupplies?.CheckList.map(
                          (item: any) => ({
                            id: item._id,

                            title: item.supplyName,
                            info: `x${item.wantedQuantity}`,
                            isDraggable: true,
                          })
                        )
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />

                {/* Card 2 */}
                <AdministrativeCard
                  icon={doneIcon}
                  addIcon={false}
                  title="Availability"
                  onDrop={(item) =>
                    handleDropSupplyItem(item, SupplyStatus.Available)
                  }
                  items={
                    Array.isArray(pageState.cleaningSupplies?.Available) &&
                    pageState.cleaningSupplies?.Available.length > 0
                      ? pageState.cleaningSupplies?.Available.map(
                          (item: any) => ({
                            id: item._id,
                            title: item.supplyName,
                            info: `x${item.wantedQuantity}`,
                            isDraggable: true,
                          })
                        )
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />

                {/* Card 3 */}
                <AdministrativeCard
                  icon={missedIcon}
                  addIcon={false}
                  title="To Repurchase"
                  onDrop={(item) =>
                    handleDropSupplyItem(item, SupplyStatus.Repurchase)
                  }
                  items={
                    Array.isArray(pageState.cleaningSupplies?.Repurchase) &&
                    pageState.cleaningSupplies?.Repurchase.length > 0
                      ? pageState.cleaningSupplies?.Repurchase.map(
                          (item: any) => ({
                            id: item._id,
                            title: item.supplyName,
                            info: `x${item.wantedQuantity}`,
                            isDraggable: true,
                          })
                        )
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />
              </div>
            </div>
          )}

          {/* Tab 3 Content */}
          {activeTab === 3 && (
            <div className={`${styles.tab3}`}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col my-[--sy-33px] w-[393px]">
                  <h3 className={`${styles.cardsTitle} mb-[--sy-10px]`}>
                    Food List
                  </h3>
                  <CustomSelectInput
                    label="Monthly"
                    options={annualOptions}
                    hoverColor="hover:bg-[#31B2E9]"
                  />
                </div>

                <CustomBtn
                  btnColor="white"
                  word="Receipts Database"
                  paddingVal="py-[--12px] px-[--20px]"
                  href="/administrative/database"

                />
              </div>

              {/* 1.1 Cards Container */}
              <div className="cards-container grid grid-cols-3 gap-[27px]">
                {/*  Card 1 */}
                <AdministrativeCard
                  icon={checkListicon}
                  addIcon={false}
                  title="Checklist"
                  onDrop={(item) =>
                    handleDropSupplyItem(item, SupplyStatus.CheckList)
                  }
                  items={
                    Array.isArray(pageState.foodSupplies?.CheckList) &&
                    pageState.foodSupplies?.CheckList.length > 0
                      ? pageState.foodSupplies?.CheckList.map((item: any) => ({
                          id: item._id,

                          title: item.supplyName,
                          info: `x${item.wantedQuantity}`,
                          isDraggable: true,
                        }))
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />

                {/* Card 2 */}
                <AdministrativeCard
                  icon={doneIcon}
                  addIcon={false}
                  title="Availability"
                  onDrop={(item) =>
                    handleDropSupplyItem(item, SupplyStatus.Available)
                  }
                  items={
                    Array.isArray(pageState.foodSupplies?.Available) &&
                    pageState.foodSupplies?.Available.length > 0
                      ? pageState.foodSupplies?.Available.map((item: any) => ({
                          id: item._id,

                          title: item.supplyName,
                          info: `x${item.wantedQuantity}`,
                          isDraggable: true,
                        }))
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />

                {/* Card 3 */}
                <AdministrativeCard
                  icon={missedIcon}
                  addIcon={false}
                  title="To Repurchase"
                  onDrop={(item) =>
                    handleDropSupplyItem(item, SupplyStatus.Repurchase)
                  }
                  items={
                    Array.isArray(pageState.foodSupplies?.Repurchase) &&
                    pageState.foodSupplies?.Repurchase.length > 0
                      ? pageState.foodSupplies?.Repurchase.map((item: any) => ({
                          id: item._id,

                          title: item.supplyName,
                          info: `x${item.wantedQuantity}`,
                          isDraggable: true,
                        }))
                      : [
                          {
                            id: "no-data",
                            title: "No data available!",
                            isDraggable: false,
                          },
                        ]
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </DndProvider>
  );
}
