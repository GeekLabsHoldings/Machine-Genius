"use client"; // Directive to indicate that this file is a client component in a Next.js application.
import React, { useEffect, useMemo, useState } from "react"; // Import the React library for building the component.
import styles from "./SupplyDatabaseTable.module.css"; // Import CSS module for component-specific styles.
import AddNewProductModal from "@/app/_components/Administrative/03Database/AddNewProductModal";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const productTypeOptions: string[] = ["All", "Snacks", "Cleaning", "Drinks"];

export default function SupplyDatabaseTable({
  getSupplies,
  supplies,
}: {
  getSupplies: () => void;
  supplies: any;
}) {
  const [filterBy, setFilterBy] = useState({
    productType: "",
    sortBy: "productPrice",
    sortOrder: "asc",
  });

  useEffect(() => {
    getSupplies();
  }, []);

  const filteredAndSortedSupplies = useMemo(() => {
    if (!Array.isArray(supplies) || supplies.length === 0) return [];

    return supplies
      .filter((item) =>
        filterBy.productType ? item.subType === filterBy.productType : true
      )
      .sort((a, b) => {
        const sortValue =
          filterBy.sortBy === "productPrice"
            ? "productPrice"
            : "wantedQuantity";
        if (filterBy.sortOrder === "asc") {
          return a[sortValue] - b[sortValue];
        } else {
          return b[sortValue] - a[sortValue];
        }
      });
  }, [supplies, filterBy]);

  const handleSortChange = (sortBy: string) => {
    setFilterBy((prev) => ({
      ...prev,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <>
      <div className={`${styles.tab1}`}>
        {/* filters options to filter and edit data in table */}
        <div
          className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[25px]`}
        >
          <div className="flex justify-between items-end">
            <div
              className={`${styles.administrativeDatabasePage} w-8/12 flex gap-[1vw]`}
            >
              <div className="flex flex-col w-1/4 gap-[0.3vw]">
                <h5>Product Type</h5>
                <CustomSelectInput
                  label="All"
                  options={productTypeOptions}
                  hoverColor="hover:bg-[#31B2E9]"
                  getValue={(value: string) =>
                    setFilterBy((prev) => ({
                      ...prev,
                      productType: value === "All" ? "" : value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col w-[25%] gap-[0.3vw]">
                <h5>Product Price</h5>
                <div
                  className={`${styles.changeOrder} `}
                  onClick={() => {
                    handleSortChange("productPrice");
                  }}
                >
                  <p>
                    {filterBy.sortBy === "productPrice"
                      ? filterBy.sortOrder === "asc"
                        ? "Ascend"
                        : "Decend"
                      : "Filter not applied"}
                  </p>
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
              <div className="flex flex-col w-[25%] gap-[0.3vw]">
                <h5>Demand</h5>
                <div
                  className={`${styles.changeOrder} `}
                  onClick={() => {
                    handleSortChange("wantedQuantity");
                  }}
                >
                  <p>
                    {filterBy.sortBy === "wantedQuantity"
                      ? filterBy.sortOrder === "asc"
                        ? "Ascend"
                        : "Decend"
                      : "Filter not applied"}
                  </p>
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

            {/* BUTTON MODALS HERE */}
            <div className="flex gap-2">
              {/* open modal to enable you to add new product */}
              <AddNewProductModal
                btnWord={"New Entry"}
                btnIcon={
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
                btnColor={"black"}
                modalTitle={"Add New Product"}
                getSupplies={getSupplies}
              />

              {/* <CustomBtn btnColor="white" word="Receipts Database" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.tableContainer} h-[65vh]`}>
        {/* Start Table */}
        <div className={styles.table}>
          {/* Table Header */}
          <ul className={styles.table_header}>
            <li className="w-[25%]">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3.33301H17.7778C19.0051 3.33301 20 4.32793 20 5.55523H0V3.33301Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M0 7.77734H20V12.444C20 14.3109 20 15.2442 19.6367 15.9573C19.3171 16.5846 18.8072 17.0945 18.18 17.414C17.4669 17.7773 16.5336 17.7773 14.6667 17.7773H5.33333C3.46649 17.7773 2.53307 17.7773 1.82003 17.414C1.19282 17.0945 0.682889 16.5846 0.363311 15.9573C1.32455e-07 15.2442 0 14.3109 0 12.444V7.77734Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M0 3.33333C0 2.29791 4.96705e-08 1.7802 0.169156 1.37181C0.3947 0.827311 0.827311 0.3947 1.37181 0.169155C1.7802 -2.15239e-07 2.29791 0 3.33333 0H5.93683C6.84517 0 7.29933 -2.15239e-07 7.70771 0.169155C8.11611 0.338311 8.43722 0.659455 9.07956 1.30174L11.1111 3.33333H0Z"
                  fill="#2A2B2A"
                />
              </svg>
              <span>Product</span>
            </li>
            <li className="w-[25%]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM10 2.85714C10.4736 2.85714 10.9278 3.04528 11.2627 3.38017C11.5976 3.71505 11.7857 4.16926 11.7857 4.64286C11.7857 5.11646 11.5976 5.57066 11.2627 5.90555C10.9278 6.24043 10.4736 6.42857 10 6.42857C9.5264 6.42857 9.0722 6.24043 8.73731 5.90555C8.40242 5.57066 8.21429 5.11646 8.21429 4.64286C8.21429 4.16926 8.40242 3.71505 8.73731 3.38017C9.0722 3.04528 9.5264 2.85714 10 2.85714ZM8.57143 10C8.57143 9.21102 9.21102 8.57143 10 8.57143C10.789 8.57143 11.4286 9.21102 11.4286 10V15.7143C11.4286 16.5033 10.789 17.1429 10 17.1429C9.21102 17.1429 8.57143 16.5033 8.57143 15.7143V10Z"
                  fill="#2A2B2A"
                />
              </svg>
              <span>Product Type</span>
            </li>
            <li className="w-[25%]">
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 11V3C3.5 1.34315 2.15685 0 0.5 0C0.22386 0 0 0.22386 0 0.5V13.5C0 13.7761 0.22386 14 0.5 14C2.15685 14 3.5 12.6569 3.5 11Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M10.5 0C12.3856 0 13.3284 2.28882e-07 13.9142 0.58579C14.5 1.17157 14.5 2.11438 14.5 4V10C14.5 11.8856 14.5 12.8284 13.9142 13.4142C13.3284 14 12.3856 14 10.5 14H9.5C7.61438 14 6.67157 14 6.08579 13.4142C5.5 12.8284 5.5 11.8856 5.5 10V4C5.5 2.11438 5.5 1.17157 6.08579 0.58579C6.67157 2.28882e-07 7.61438 0 9.5 0H10.5Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M16.5 3V11C16.5 12.6569 17.8431 14 19.5 14C19.7761 14 20 13.7761 20 13.5V0.5C20 0.22386 19.7761 0 19.5 0C17.8431 0 16.5 1.34315 16.5 3Z"
                  fill="#2A2B2A"
                />
              </svg>
              <span>Product Price</span>
            </li>
            <li className="w-[25%]">
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 11V3C3.5 1.34315 2.15685 0 0.5 0C0.22386 0 0 0.22386 0 0.5V13.5C0 13.7761 0.22386 14 0.5 14C2.15685 14 3.5 12.6569 3.5 11Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M10.5 0C12.3856 0 13.3284 2.28882e-07 13.9142 0.58579C14.5 1.17157 14.5 2.11438 14.5 4V10C14.5 11.8856 14.5 12.8284 13.9142 13.4142C13.3284 14 12.3856 14 10.5 14H9.5C7.61438 14 6.67157 14 6.08579 13.4142C5.5 12.8284 5.5 11.8856 5.5 10V4C5.5 2.11438 5.5 1.17157 6.08579 0.58579C6.67157 2.28882e-07 7.61438 0 9.5 0H10.5Z"
                  fill="#2A2B2A"
                />
                <path
                  d="M16.5 3V11C16.5 12.6569 17.8431 14 19.5 14C19.7761 14 20 13.7761 20 13.5V0.5C20 0.22386 19.7761 0 19.5 0C17.8431 0 16.5 1.34315 16.5 3Z"
                  fill="#2A2B2A"
                />
              </svg>
              <span>Demand</span>
            </li>
          </ul>

          {/* Table Body */}
          {/* Rendering table rows dynamically based on bodyRow array */}
          <div className={styles.table_body}>
            {Array.isArray(filteredAndSortedSupplies) &&
            filteredAndSortedSupplies.length > 0 ? (
              filteredAndSortedSupplies.map((e: any) => (
                <ul className="w-[100%]" key={e._id}>
                  <li className="w-[25%]">{e.supplyName}</li>
                  <li className="w-[25%]">
                    <span className={`${styles[e.subType]} ${styles.type}`}>
                      {e.subType}
                    </span>
                  </li>
                  <li className="w-[25%]">{e.productPrice}</li>
                  <li className="w-[25%]">{e.wantedQuantity}</li>
                </ul>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-gray-500">No supplies found!</span>
              </div>
            )}
          </div>
        </div>
        {/* End Table */}
      </div>
    </>
  );
}
