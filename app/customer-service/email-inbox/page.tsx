import styles from "@/app/customer-service/email-inbox/email-inbox.module.css";
import CheckBox from "@/app/_components/CheckBox/CheckBox";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import OptionsDropdown from "@/app/_components/OptionsDropdown/OptionsDropdown";
import { truncateText } from "@/app/_utils/text";
import Link from "next/link";

const table = [
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "PST USA",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "PST Asia",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Investocracy",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "PST USA",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Canada",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Canada",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "PST USA",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Investocracy",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Canada",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Investocracy",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Street Politics",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Canada",
    dateSent: "12 March 2024",
  },
  {
    customerName: "John Doe",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "PST USA",
    dateSent: "12 March 2024",
  },
];

const getRandomColor = () => {
  const colors = [
    "#31B2E9B2",
    "#E1C655B2",
    "#5FA85BB5",
    "#E9313EB2",
    "#F36F24B2",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const files = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 10.7777V13.2C22 17.3483 22 19.4226 20.7112 20.7112C19.4226 22 17.3484 22 13.2 22H8.8C4.65166 22 2.57747 22 1.28873 20.7112C0.216975 19.6395 0.036531 18.0245 0.00614896 15.1251H9.56307L7.07731 16.9329C6.70882 17.2008 6.62736 17.7168 6.89534 18.0853C7.16333 18.4538 7.6793 18.5352 8.04779 18.2673L12.5853 14.9673C12.7987 14.8121 12.925 14.564 12.925 14.3001C12.925 14.0361 12.7987 13.7881 12.5853 13.6329L8.04779 10.3329C7.6793 10.0649 7.16333 10.1463 6.89534 10.5148C6.62736 10.8833 6.70882 11.3993 7.07731 11.6673L9.56307 13.4751H1.10149e-05L0 13.2L3.30448e-05 5.44473C3.30448e-05 4.47398 3.30527e-05 3.98853 0.0763181 3.58423C0.412137 1.80434 1.80436 0.412104 3.58425 0.076285C3.98857 7.86781e-09 4.47396 0 5.44475 0C5.87008 0 6.08276 0 6.28715 0.019118C7.16834 0.101519 8.00419 0.447744 8.68556 1.01256C8.84356 1.14357 8.99393 1.29396 9.29478 1.59473L9.9 2.2C10.7974 3.09736 11.2461 3.54604 11.7833 3.84497C12.0786 4.00918 12.3916 4.13886 12.7164 4.23146C13.3077 4.4 13.9423 4.4 15.2112 4.4H15.6223C18.518 4.4 19.9658 4.4 20.9068 5.24641C20.9934 5.32426 21.0758 5.40665 21.1537 5.49321C22 6.43429 22 7.88209 22 10.7777Z"
      fill="#2A2B2A"
    />
  </svg>
);

const bin = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.1305 20.1113L2.2 6.6H19.8L17.8695 20.1113C17.7946 20.6355 17.5331 21.1152 17.133 21.4621C16.7329 21.809 16.2211 22 15.6915 22H6.3085C5.77893 22 5.26713 21.809 4.86704 21.4621C4.46695 21.1152 4.20543 20.6355 4.1305 20.1113ZM20.9 2.2H15.4V1.1C15.4 0.808262 15.2841 0.528472 15.0778 0.322183C14.8715 0.115892 14.5917 0 14.3 0H7.7C7.40826 0 7.12847 0.115892 6.92218 0.322183C6.71589 0.528472 6.6 0.808262 6.6 1.1V2.2H1.1C0.808262 2.2 0.528472 2.31589 0.322183 2.52218C0.115892 2.72847 0 3.00826 0 3.3C0 3.59174 0.115892 3.87153 0.322183 4.07782C0.528472 4.28411 0.808262 4.4 1.1 4.4H20.9C21.1917 4.4 21.4715 4.28411 21.6778 4.07782C21.8841 3.87153 22 3.59174 22 3.3C22 3.00826 21.8841 2.72847 21.6778 2.52218C21.4715 2.31589 21.1917 2.2 20.9 2.2Z"
      fill="#2A2B2A"
    />
  </svg>
);

function Page() {
  return (
    <div className="flex flex-col h-full py-[1.5vw]">
      <div>
        <span className="text-lg font-semibold [text-color:var(--dark)]">
          Brand
        </span>
        <div className="flex items-center mt-2 shrink-0 grow">
          <div className={`${styles.dropdown__container} mr-[--16px]`}>
            <CustomSelectInput
              label="Filter by"
              options={["All", "Unread", "Read"]}
              paddingVal="py-[0.2vw] px-[0.5vw]"
              hoverColor="hover:bg-[#00B3BE]"
            />
          </div>
          <div className="mr-[--8px]">
            <OptionsDropdown
              icon={files}
              options={["Mark as Read", "Mark as Unread", "Delete"]}
            />
          </div>
          <OptionsDropdown
            icon={bin}
            options={["Mark as Read", "Mark as Unread", "Delete"]}
          />
        </div>
      </div>

      <div className="h-[75vh] py-[1.5vw] ">
        <div className={styles.database_table}>
          <ul className={styles.table_header}>
            <li className="w-[5%]">
              <CheckBox />
            </li>
            <li className="w-[15%]">
              <span>Customer Name</span>
            </li>
            <li className="w-[40%]">
              <span>Subject</span>
            </li>
            <li className="w-[20%]">
              <span>Brand</span>
            </li>
            <li className="w-[20%]">
              <span>Date</span>
            </li>
          </ul>

          <div className={styles.table_body}>
            {table.map((ele, idx) => (
              <ul className="w-[100%] group relative" key={idx}>
                <Link
                  href="/customer-service/email-inbox/email"
                  className="absolute inset-0 z-[1]"
                ></Link>
                <li className="w-[5%]">
                  <CheckBox />
                </li>
                <li className="w-[15%]">{ele.customerName}</li>
                <li className="w-[40%]">
                  <p>{truncateText(ele.subject, 70)}</p>
                </li>
                <li className="w-[20%]">
                  <span
                    className="py-[--3px] px-[--6px] rounded-[--3px] font-medium"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {ele.brand}
                  </span>
                </li>
                <li className="w-[20%]">{ele.dateSent}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
