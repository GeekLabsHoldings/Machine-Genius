'use client'

// Importing necessary components and styles
import CustomBtn from '@/app/_components/Button/CustomBtn'; // Custom button component
import styles from './SchadulePost.module.css'; // Stylesheet for SchadulePost component
import { useState } from 'react'; // React useState hook for managing state
import profileImg from '@/public/assets/post-profile.svg'; // Profile image
import Image from 'next/image'; // Next.js Image component for optimized image loading
import postImage from '@/public/assets/post-img.svg'; // Post image
import postImage2 from '@/public/assets/post-img2.svg'; // Post image2
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'; // Custom select input component
import { useRouter } from 'next/navigation'; // Next.js useRouter for client-side navigation
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'; // Logo and title component

// SVG icon components
const reGenerateIcon = <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
  <path d="M0.754732 6.49635C0.310457 6.55953 0.00154495 6.97089 0.0646763 7.41516C0.257889 8.77361 0.876039 10.0362 1.83056 11.0219C2.78517 12.0075 4.02716 12.6659 5.37876 12.9026C6.73034 13.1392 8.12216 12.9421 9.35487 12.3394C9.64191 12.1991 9.91688 12.0385 10.178 11.8593C10.622 11.5546 11.2322 11.5579 11.613 11.9387C12.1248 12.4506 13 12.088 13 11.3642V9.12498C13 8.57269 12.5523 8.12498 12 8.12498H9.76078C9.03693 8.12498 8.67441 9.00013 9.18626 9.51201C9.50975 9.83548 9.49955 10.3701 9.11337 10.6153C8.96152 10.7117 8.80392 10.8 8.64114 10.8796C7.71661 11.3316 6.67275 11.4794 5.65905 11.3019C4.64539 11.1244 3.71386 10.6307 2.99796 9.89137C2.28199 9.15207 1.81838 8.20527 1.67351 7.18636C1.61029 6.7421 1.19893 6.43317 0.754732 6.49635ZM3.64512 0.660543C3.35608 0.801857 3.07927 0.963766 2.81654 1.14447C2.37444 1.44855 1.76644 1.44537 1.38702 1.06594C0.875144 0.554093 0 0.916605 0 1.64047V3.875C0 4.42729 0.447716 4.875 1 4.875H3.23456C3.95842 4.875 4.32096 3.99983 3.80908 3.48799C3.48674 3.16564 3.49674 2.63303 3.88124 2.38813C4.03473 2.29037 4.19413 2.20093 4.35882 2.1204C5.2834 1.6684 6.32725 1.52056 7.34095 1.69807C8.35464 1.87558 9.28615 2.36934 10.0021 3.10861C10.718 3.84788 11.1816 4.79476 11.3265 5.81363C11.3897 6.25789 11.801 6.56681 12.2453 6.50363C12.6896 6.44045 12.9985 6.02909 12.9353 5.58483C12.7421 4.22635 12.124 2.96385 11.1694 1.97815C10.2148 0.992452 8.97283 0.334114 7.62124 0.0974319C6.26966 -0.139249 4.87784 0.0578646 3.64512 0.660543Z" fill="#FFFFFB" />
</svg>

// Options for account and upload time
const acountOptions = ["Investocracy", "Street Suite"];
const UploudOptions = ["8:30 PM GMT", "9:30 PM GMT"];

// SchadulePost component
const SchadulePost = () => {

  // State for post text and loading indicator
  const [PostText, setPostText] = useState<string>("Stocks, the heartbeat of the market! Whether you're a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape.  #stockstoday");
  const [IsLoading, setIsLoading] = useState(false); // Loading state

  const router = useRouter(); // useRouter hook for navigation

  // Function to handle navigation
  const handleNavigate = () => {
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col h-full">

      {/* Conditional rendering based on loading state */}
      {IsLoading ? (
        // Display loading message and dashboard button
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto space-y-[2vw] h-[75vh] py-[1.5vw]">
          <LogoAndTitle needTxt={true} title='Your tweet has been published!' />
          <CustomBtn word="Dashboard" btnColor="black" href="/social-media/dashboard" />
        </div>
      ) : (
        // Render tweet scheduling form
        <>
          <div className={"flex flex-col w-full h-[75vh] py-[1vw] " + styles.add_post_wrapper}>
            <h6>Twitter Post</h6>

            <div className="grid grid-cols-2 gap-[2vw] w-full h-full">

              {/* Post images section */}
              <div className={styles.post_images + " flex flex-col"}>
                <h6>Image Selection</h6>

                <div className={styles.image_selection}>
                  {/* Image options */}
                  {/* Image option */}
                  <div className={styles.image_option}>
                    <div className={styles.isSelected}>selected</div>
                    <Image src={postImage} alt="post image" />
                    <input type="checkbox" name="post-images" id="" />
                  </div>
                  {/* Image option */}
                  <div className={styles.image_option}>
                    <div className={styles.isSelected}>selected</div>
                    <Image src={postImage} alt="post image" />
                    <input type="checkbox" name="post-images" id="" />
                  </div>
                  {/* Image option */}
                  <div className={styles.image_option}>
                    <div className={styles.isSelected}>selected</div>
                    <Image src={postImage} alt="post image" />
                    <input type="checkbox" name="post-images" id="" />
                  </div>
                  {/* Repeat for other image options */}
                </div>
                {/* Button to regenerate images */}
                <CustomBtn btnColor='black' word='Re-Generate' icon={reGenerateIcon} />

                {/* Schedule post section */}
                <div className={styles.schadule_post}>
                  <h6>Schedule</h6>

                  {/* Account selection */}
                  <label htmlFor="">Account</label>
                  <CustomSelectInput options={acountOptions} />

                  {/* Upload time selection */}
                  <label htmlFor="" className='mt-[0.5vw]'>Upload Time</label>
                  <CustomSelectInput options={UploudOptions} />

                  {/* Button to schedule post */}
                  <CustomBtn btnColor='black' word='Schedule' />

                </div>
              </div>

              {/* Post preview section */}
              <div className='h-full'>
                <div className={styles.post_view_screens + " flex gap-[1vw] h-full"}>
                  {/* Desktop view */}
                  <div className={styles.desctop_screen + " w-2/3 h-full"}>
                    <h6>Desktop View</h6>
                    <div className={styles.desctop_view}>
                      {/* Avatar and post content */}
                      <div className={styles.avatar}>
                        <Image src={profileImg} alt='avatar' />
                        {/* Avatar information */}
                        <div className={styles.avatar_info}>
                          <p>Investocracy
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                              {/* SVG icon */}
                            </svg>
                          </p>
                          <span>@Investocrasy</span>
                        </div>
                      </div>

                      {/* Post text and image */}
                      <p>{PostText}</p>
                      <Image src={postImage} alt='' />
                    </div>
                  </div>
                  {/* Mobile view */}
                  <div className={styles.mobile_screen + " w-1/3"}>
                    <h6>Mobile View</h6>
                    <div className={styles.mobile_view}>
                      {/* Avatar and post content */}
                      <div className={styles.avatar}>
                        <Image src={profileImg} alt='avatar' />
                        {/* Avatar information */}
                        <div className={styles.avatar_info}>
                          <p>Investocracy
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                              {/* SVG icon */}
                            </svg>
                          </p>
                          <span>@Investocrasy</span>
                        </div>
                      </div>

                      {/* Post text and image */}
                      <p>{PostText}</p>
                      <Image src={postImage} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons to navigate back or publish */}
          <div className="flex justify-between items-center">
            <CustomBtn word="Back" btnColor="white" href="/social-media/post/choose-sub-brand" />
            <CustomBtn word="Publish " btnColor="black" onClick={handleNavigate} />
          </div>
        </>
      )}

    </div>
  );
};

export default SchadulePost;