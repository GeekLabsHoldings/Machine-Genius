"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./article-database.module.css";
import {
  ApprovalStatus,
  ArticleNames,
  Brands,
  ContentTypeFilter,
  YourArticles,
} from "@/app/_data/data";
// import { useState } from "react";
import $ from 'jquery'

const ArticleDatabase = () => {

  // const [SelectedValue, setSelectedValue] = useState<string | number>()
  // const handleBrandName = (value:string|number)=>{
  //   setSelectedValue(value)
  // }
  

    const handleSelectedBg = (e: any)=>{
        $('.articleRow').removeClass('selected')
        $(e.target).parents('.articleRow').toggleClass('selected')
    }

  const renderYourArticles = YourArticles.map((oneArticle , idx) => (
    <ul
    key={idx}
      className = { `${styles.tableBody} ${styles.borderBottom} articleRow` } 
      onClick={(e)=>{handleSelectedBg(e)}}
    >
      <li className="w-[4vw]">{oneArticle.id}</li>
      <li className="w-[20vw]">{oneArticle.articleName}</li>
      <li className="w-[15vw]">
        <span
          className={
            oneArticle.brand === "PST USA"
              ? "bg-[#31B2E9B2]"
              : oneArticle.brand === "Canada"
              ? "bg-[#E9313EB2]"
              : oneArticle.brand === "PST Asia"
              ? "bg-[#E1C655B2]"
              : oneArticle.brand === "Investocracy"
              ? "bg-[#5FA85BB5]"
              : "bg-[#F36F24B2]"
          }
        >
          {oneArticle.brand}
        </span>
      </li>
      <li className={`w-[10vw] ${styles.contentType}`}>
        <ul>
          {oneArticle.contentType.map((type , idx) => (
            <li key={idx}>{type}</li>
          ))}
        </ul>
      </li>
      <li className="w-[10vw]">
        <div className={`${styles.viewsDiv} flex`}>
          <h6>{oneArticle.views}</h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 11"
            fill="none"
          >
            <path
              d="M19.9494 2.76915e-06L1.04883 1.11645e-06C0.857472 0.000420716 0.669902 0.037347 0.506307 0.106803C0.342711 0.176259 0.209287 0.275614 0.120398 0.394177C0.0315084 0.512738 -0.00947862 0.646018 0.00184339 0.779666C0.0131673 0.913315 0.0763711 1.04227 0.184657 1.15266L9.63492 10.703C10.0266 11.099 10.9695 11.099 11.3622 10.703L20.8125 1.15266C20.9219 1.0425 20.986 0.913482 20.998 0.779611C21.0099 0.64574 20.9692 0.51214 20.8802 0.393327C20.7912 0.274514 20.6574 0.17503 20.4933 0.105687C20.3292 0.0363435 20.1411 -0.000207976 19.9494 2.76915e-06Z"
              fill={oneArticle.views === '300' ? '#E9313E':'#5FA85B' }
            />
          </svg>
        </div>
      </li>
      <li className="w-[10vw] "><span className={
            oneArticle.approvals === "Pending"
              ? "bg-[#E1C655B2]"
              : oneArticle.approvals === "Approved"
              ? "bg-[#5FA85BB5]"
              : "bg-[#E9313EB2]"
            
          }>{oneArticle.approvals}</span></li>
      <li className="w-[15vw] ">{oneArticle.date}</li>
      <li className={`w-[6vw] ${styles.edit}`}>
        <a href="#">{oneArticle.editBtn}</a>
      </li>
    </ul>
  ));
  return (
    <div className="flex flex-col gap-[1vw]">
      <div
        className={`${styles.articleDatabase} flex flex-col justify-center items-center h-[85vh] w-full gap-[1vw] `}
      >
        <div className={`flex flex-col gap-[0.7vw] w-full pageHeader`}>
          <h3>Filter By:</h3>
          <div className={`${styles.filters} flex justify-between`}>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Article Name</h5>
              <CustomSelectInput label="All" options={ArticleNames} />
            </div>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Brand</h5>
              <CustomSelectInput label="All" options={Brands}/>
            </div>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Content Type</h5>
              <CustomSelectInput label="All" options={ContentTypeFilter} />
            </div>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Approvals</h5>
              <CustomSelectInput label="All" options={ApprovalStatus}/>
            </div>
            <div className="flex flex-col w-[10vw] gap-[0.3vw]">
              <h5>Views</h5>

              <div className={`${styles.changeOrder} `}>
                <h5>Views</h5>
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
            <div className="flex flex-col w-[10vw] gap-[0.3vw]">
              <h5>Date</h5>
              <div className={`${styles.changeOrder} `}>
                <h5>Date</h5>
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
        </div>

        <div className={`${styles.box} w-full px-[0.5vw]`}>
          <div>
            <ul
              className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
            >
              <li className="w-[4vw]">#</li>
              <li className="w-[20vw]">Article Name</li>
              <li className="w-[15vw]">Brand</li>
              <li className="w-[10vw]">Content Type</li>
              <li className="w-[10vw]">Views</li>
              <li className="w-[10vw]">Approvals</li>
              <li className="w-[15vw]">Date</li>
              <li className="w-[6vw]">Edit</li>
            </ul>

            {renderYourArticles}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDatabase;
