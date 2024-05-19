import Dropdown from "@/app/_components/Dropdown/Dropdown";
import styles from "@/app/customer-service/email-inbox/email-inbox.module.css";

function page() {
  return (
    <div className="flex flex-col gap-9 m-9 w-full h-full bg-white dark:bg-gray-800">
      <div>
        <span className="text-lg font-semibold [text-color:var(--dark)]">
          Brand
        </span>
        <div className="flex items-center gap-5 mt-2 shrink-0 grow">
          <Dropdown title="Filter by" items={["All", "Unread", "Read"]} />
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
        </div>
      </div>
      <div
        className={`relative overflow-x-auto border-2 [border-color:#DBDBD7] rounded-[20px] p-5 ${styles.table__container}`}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-b [border-color:var(--dark)]">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="w-4 h-4 relative flex items-center justify-center border-[0.67px] [border-color:var(--dark)] rounded-[1.33px] cursor-pointer">
                  <label
                    htmlFor="check"
                    className="border-[0.67px] w-2 h-2 [border-color:var(--dark)] aspect-square rounded-[0.67px]"
                  >
                    <input
                      type="checkbox"
                      className="absolute inset-0 opacity-0"
                      id="check"
                    />
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
