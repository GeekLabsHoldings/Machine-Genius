"use client";
import styles from './reddit.module.css'
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { useRouter } from "next/navigation";
import {
  ApprovalStatus,
  ArticleNames,
  Brands,
  ContentTypeFilter,
  YourArticles,
} from "@/app/_data/data";
import $ from 'jquery'
import CustomBtn from '@/app/_components/Button/CustomBtn';

const Reddit = () => {

    const router = useRouter();
    const handleNavigate = ()=>{
        router.push('/content-creator/create/article-images')
    }

// to apply effect in selected article when click on it
    const handleSelectedBg = (e: any)=>{
        $('.articleRow').removeClass('selected')
        $(e.target).parents('.articleRow').toggleClass('selected')
    }

  const renderYourArticles = YourArticles.map((oneArticle , idx) => (
    <ul
    key={idx}
      className = { `${styles.tableBody} borderBottom articleRow ` } 
      onClick={(e)=>{handleSelectedBg(e)}}
    >
      <li className="w-[2%]">{oneArticle.id}</li>
      <li className="w-3/12 ">{oneArticle.articleName}</li>
      <li className="w-1/12 ">
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
      <li className={`w-2/12  ${styles.contentType}`}>
          {oneArticle.contentType}
      </li>
      <li className="w-1/12 ">
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
      <li className="w-2/12  "><span className={
            oneArticle.approvals === "Pending"
              ? "bg-[#E1C655B2]"
              : oneArticle.approvals === "Approved"
              ? "bg-[#5FA85BB5]"
              : "bg-[#E9313EB2]"
            
          }>{oneArticle.approvals}</span></li>
      <li className="w-1/12 ">{oneArticle.date}</li>
      <li className={` w-1/12 ${styles.edit}`}>
        <a href="#">{oneArticle.editBtn}</a>
      </li>
    </ul>
  ));

  return (
      <div className={`${styles.articleDatabase} w-full h-full pt-[0.5vw]`}>

        {/* filters options to filter and edit data in table */}
          <div className={`flex flex-col gap-[0.7vw] w-full pageHeader`}>
            <div className={` flex items-center gap-[1vw]`}>
            <svg viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleNavigate()}} className={`cursor-pointer ${styles.backArrow}`}>
            <path d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z" fill="#2A2B2A"/>
            </svg>
            <h3>Reddit</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.redditFace}`}>
            <path d="M12 0C5.38125 0 0 5.38125 0 12C0 18.6188 5.38125 24 12 24C18.6188 24 24 18.6188 24 12C24 5.38125 18.6188 0 12 0Z" fill="#FC471E"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4446 5.92286C15.4337 5.99171 15.428 6.06236 15.428 6.13436C15.428 6.86125 16.0037 7.45053 16.7137 7.45053C17.4238 7.45053 17.9994 6.86125 17.9994 6.13436C17.9994 5.40744 17.4238 4.81816 16.7137 4.81816C16.3974 4.81816 16.1076 4.93516 15.8836 5.12921L12.5448 4.28613L11.338 9.22765C9.73264 9.33582 8.28887 9.83348 7.1997 10.5848C6.89044 10.2744 6.46679 10.0829 5.99944 10.0829C5.05267 10.0829 4.28516 10.8686 4.28516 11.8378C4.28516 12.5124 4.65686 13.098 5.20202 13.3917C5.16263 13.601 5.1423 13.8146 5.1423 14.0315C5.1423 16.6969 8.21233 18.8576 11.9994 18.8576C15.7866 18.8576 18.8566 16.6969 18.8566 14.0315C18.8566 13.8146 18.8363 13.601 18.7968 13.3917C19.342 13.098 19.7137 12.5124 19.7137 11.8378C19.7137 10.8686 18.9462 10.0829 17.9994 10.0829C17.5321 10.0829 17.1084 10.2744 16.7992 10.5848C15.6126 9.76628 14.0051 9.24873 12.2263 9.2081L13.1684 5.35022L15.4446 5.92286ZM8.99944 14.4703C9.7095 14.4703 10.2852 13.881 10.2852 13.154C10.2852 12.4271 9.7095 11.8378 8.99944 11.8378C8.28938 11.8378 7.71373 12.4271 7.71373 13.154C7.71373 13.881 8.28938 14.4703 8.99944 14.4703ZM14.9994 14.4703C15.7095 14.4703 16.2852 13.881 16.2852 13.154C16.2852 12.4271 15.7095 11.8378 14.9994 11.8378C14.2894 11.8378 13.7137 12.4271 13.7137 13.154C13.7137 13.881 14.2894 14.4703 14.9994 14.4703ZM9.23713 15.8601C9.04024 15.7257 8.77418 15.7802 8.64287 15.9818C8.51156 16.1834 8.56479 16.4558 8.76167 16.5902C9.69433 17.2267 10.8469 17.5449 11.9994 17.5449C13.152 17.5449 14.3046 17.2267 15.2371 16.5902C15.4341 16.4558 15.4873 16.1834 15.356 15.9818C15.2247 15.7802 14.9586 15.7257 14.7617 15.8601C13.973 16.3983 12.9863 16.6675 11.9994 16.6675C11.4143 16.6675 10.829 16.5728 10.2852 16.3836C9.91196 16.2536 9.55813 16.0791 9.23713 15.8601Z" fill="white"/>
            </svg>
            </div>
        
          <div className={`${styles.filters} ${styles.redditPage} flex gap-[1vw]`}>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Subscribers</h5>
              <CustomSelectInput label="All" options={ArticleNames} />
            </div>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Niche</h5>
              <CustomSelectInput label="All" options={Brands}/>
            </div>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <h5>Brand</h5>
              <CustomSelectInput label="All" options={ContentTypeFilter} />
            </div>
            
            <div className="flex flex-col w-[10%] gap-[0.3vw]">
              <h5>Engagement</h5>
              <div className={`${styles.changeOrder} `}>
                <p>Rating</p>
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
            <CustomBtn word={'Add To List'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z" fill="#FFFFFB"/>
            </svg>} btnColor='black'/>
   
          </div>

          

        </div>
     
        {/* // table has all articles and its data  */}
         <div className={`${styles.box} w-full px-[0.5vw] `}>
           <div className={`${styles.tableContent}`}>
           <ul
              className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
            >
              <li className="w-[2%]">#</li>
              <li className="w-3/12 ">Article Name</li>
              <li className="w-1/12 ">Brand</li>
              <li className="w-2/12 ">Content Type</li>
              <li className="w-1/12 ">Views</li>
              <li className="w-2/12 ">Approvals</li>
              <li className="w-1/12 ">Date</li>
              <li className="w-1/12">Edit</li>
            </ul>

            {renderYourArticles}
           </div>
        </div>  
      </div>
  
  );
};

export default Reddit;
