import Dropdown from "@/app/_components/Dropdown/Dropdown";
import { truncateText } from "@/app/_utils/text";
import styles from "@/app/customer-service/chat/chat.module.css";

const messages = [
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message:
      "Hello, how can I help you today? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, how can I help you today?",
    time: "12:00 PM",
  },
];

function page() {
  return (
    <div className="flex h-full py-[1.5vw]">
      <div className={`flex flex-col h-full ${styles.chat__chat__aside}`}>
        <div>
          <h2 className="mb-5 text-2xl font-semibold">Chats</h2>
          <Dropdown title="Brand" items={["All", "Unread", "Read"]} />
        </div>
        <div
          className={`flex flex-col border-2 [border-color:#DBDBD7] rounded-[20px] h-[50vh] overflow-hidden mt-6 shrink-0 grow py-5 ${styles.chat__chat__aside__menu}`}
        >
          <input
            type="text"
            placeholder="Search"
            className="h-min border mx-5 [border-color:var(--dark)] rounded-[5px] text-sm placeholder:[color:var(--dark)] py-2 px-4 "
          />

          <div className="h-[1px] bg-[#DBDBD7] mt-5 mx-5"></div>
          <ul className="flex flex-col relative max-h-[90%] overflow-y-auto [border-color:#DBDBD7] w-full">
            {messages.map((message, index) => (
              <li
                className={`cursor-pointer ${styles.chat__chat__aside__menu__item} group transition-colors duration-300 ease-in-out hover:[background-color:var(--dark)]`}
                key={index}
              >
                <div className="flex relative mx-5 gap-5 py-[23px] group-hover:border-transparent">
                  <div
                    className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile} group-hover:[background-color:var(--white)]`}
                  >
                    {/* <img src="/images/profile.png" alt="profile" /> */}
                  </div>
                  <div className="flex flex-col justify-center gap-1 w-[80%]">
                    <h3 className="font-bold text-xl transition-colors duration-100">{message.name}</h3>
                    <p className="text-base [color:#828282] overflow-hidden whitespace-nowrap text-ellipsis">
                      {truncateText(message.message, 60)}
                    </p>
                  </div>
                  <div className="absolute flex justify-center items-center right-4 top-0 bottom-0">
                    <div className="w-3 h-3 rounded-full bg-[#E9313E]"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="h-[1px] bg-[#DBDBD7] mx-5"></div>
        </div>
      </div>
    </div>
  );
}

export default page;
