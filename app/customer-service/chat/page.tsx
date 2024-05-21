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
    message: "Hello, how can I help you today? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          className={`flex flex-col border-2 [border-color:#DBDBD7] rounded-[20px] h-[50vh] overflow-hidden mt-6 shrink-0 grow p-5 ${styles.chat__chat__aside__menu}`}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full h-min border [border-color:var(--dark)] rounded-[5px] text-sm placeholder:[color:var(--dark)] py-2 px-4 "
          />
          <ul className="flex flex-col max-h-[90%] overflow-scroll border-y [border-color:#DBDBD7] mt-5 w-full">
            {messages.map((message, index) => (
              <li
                className={`flex py-[23px] px=[27px] gap-5 cursor-pointer ${styles.chat__chat__aside__menu__item}`}
                key={index}
              >
                <div
                  className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile}`}
                >
                  {/* <img src="/images/profile.png" alt="profile" /> */}
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <h3 className="font-bold text-xl">{message.name}</h3>
                  <p className="text-base [color:#828282] overflow-hidden whitespace-nowrap text-ellipsis max-w-96">{truncateText(message.message, 40)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
