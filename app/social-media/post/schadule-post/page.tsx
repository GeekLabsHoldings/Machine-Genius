'use client'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import styles from './SchadulePost.module.css'
import { useState } from 'react'
import profileImg from '@/public/assets/post-profile.svg'
import Image from 'next/image'
import postImage from '@/public/assets/post-img.svg'
import postImage2 from '@/public/assets/post-img2.svg'
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'
import { useRouter } from 'next/navigation'
import LogoAndTitle from '@/app/_components/LogoAndTitle/LogoAndTitle'


const reGenerateIcon = <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
  <path d="M0.754732 6.49635C0.310457 6.55953 0.00154495 6.97089 0.0646763 7.41516C0.257889 8.77361 0.876039 10.0362 1.83056 11.0219C2.78517 12.0075 4.02716 12.6659 5.37876 12.9026C6.73034 13.1392 8.12216 12.9421 9.35487 12.3394C9.64191 12.1991 9.91688 12.0385 10.178 11.8593C10.622 11.5546 11.2322 11.5579 11.613 11.9387C12.1248 12.4506 13 12.088 13 11.3642V9.12498C13 8.57269 12.5523 8.12498 12 8.12498H9.76078C9.03693 8.12498 8.67441 9.00013 9.18626 9.51201C9.50975 9.83548 9.49955 10.3701 9.11337 10.6153C8.96152 10.7117 8.80392 10.8 8.64114 10.8796C7.71661 11.3316 6.67275 11.4794 5.65905 11.3019C4.64539 11.1244 3.71386 10.6307 2.99796 9.89137C2.28199 9.15207 1.81838 8.20527 1.67351 7.18636C1.61029 6.7421 1.19893 6.43317 0.754732 6.49635ZM3.64512 0.660543C3.35608 0.801857 3.07927 0.963766 2.81654 1.14447C2.37444 1.44855 1.76644 1.44537 1.38702 1.06594C0.875144 0.554093 0 0.916605 0 1.64047V3.875C0 4.42729 0.447716 4.875 1 4.875H3.23456C3.95842 4.875 4.32096 3.99983 3.80908 3.48799C3.48674 3.16564 3.49674 2.63303 3.88124 2.38813C4.03473 2.29037 4.19413 2.20093 4.35882 2.1204C5.2834 1.6684 6.32725 1.52056 7.34095 1.69807C8.35464 1.87558 9.28615 2.36934 10.0021 3.10861C10.718 3.84788 11.1816 4.79476 11.3265 5.81363C11.3897 6.25789 11.801 6.56681 12.2453 6.50363C12.6896 6.44045 12.9985 6.02909 12.9353 5.58483C12.7421 4.22635 12.124 2.96385 11.1694 1.97815C10.2148 0.992452 8.97283 0.334114 7.62124 0.0974319C6.26966 -0.139249 4.87784 0.0578646 3.64512 0.660543Z" fill="#FFFFFB" />
</svg>

const addIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66667 14.6667C6.66667 15.4031 7.2636 16 8 16C8.7364 16 9.33333 15.4031 9.33333 14.6667V9.33333H14.6667C15.4031 9.33333 16 8.7364 16 8C16 7.2636 15.4031 6.66667 14.6667 6.66667H9.33333V1.33333C9.33333 0.596947 8.7364 0 8 0C7.2636 0 6.66667 0.596947 6.66667 1.33333V6.66667H1.33333C0.59696 6.66667 0 7.2636 0 8C0 8.7364 0.59696 9.33333 1.33333 9.33333H6.66667V14.6667Z" fill="#FFFFFB" />
</svg>

const acountOptions = ["Investocracy", "Street Suite"];
const UploudOptions = ["8:30 PM GMT", "9:30 PM GMT"];

const SchadulePost = () => {

  const [PostText, setPostText] = useState<string>("Stocks, the heartbeat of the market! Whether you're a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape.  #stockstoday")


  // loading state that show and hide loading
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleNavigate = () => {

    setIsLoading(true)

    // setTimeout(() => {
    //   // Your action here
    //   router.push('/social-media/post/schadual-post')

    // }, 1500); // 3000 milliseconds = 3 seconds

  }

  return (
    <div className="flex flex-col h-full">

      {IsLoading ? <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto space-y-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={true} title='Your tweet has been published!' />
        <CustomBtn word="Dashboard" btnColor="black" href="/social-media/dashboard" />
      </div> : <>
        <div className={"flex flex-col w-full h-[75vh] py-[1vw] " + styles.add_post_wrapper}>
          <h6>Twitter Post</h6>

          <div className="grid grid-cols-2 gap-[2vw] w-full h-full">

            <div className={styles.post_images + " flex flex-col"}>
              <h6>Image Selection</h6>

              <div className={styles.image_selection}>
                <div className={styles.image_option}>
                  <div className={styles.isSelected}>selected</div>
                  <Image src={postImage} alt="post image" />
                  <input type="checkbox" name="post-images" id="" />
                </div>
                <div className={styles.image_option}>
                  <div className={styles.isSelected}>selected</div>
                  <Image src={postImage2} alt="post image" />
                  <input type="checkbox" name="post-images" id="" />
                </div>
                <div className={styles.image_option}>
                  <div className={styles.isSelected}>selected</div>
                  <Image src={postImage} alt="post image" />
                  <input type="checkbox" name="post-images" id="" />
                </div>
              </div>
              <CustomBtn btnColor='black' word='Re-Generate' icon={reGenerateIcon} />


              <div className={styles.schadule_post}>
                <h6>Schedule</h6>

                <label htmlFor="">Account</label>
                <CustomSelectInput options={acountOptions} />

                <label htmlFor="" className='mt-[0.5vw]'>Upload Time</label>
                <CustomSelectInput options={UploudOptions} />

                <CustomBtn btnColor='black' word='Schadule' />

              </div>


            </div>

            <div className='h-full'>
              <div className={styles.post_view_screens + " flex gap-[1vw] h-full"}>
                <div className={styles.desctop_screen + " w-2/3 h-full"}>
                  <h6>Desktop View</h6>
                  <div className={styles.desctop_view}>
                    <div className={styles.avatar}>
                      <Image src={profileImg} alt='avatar' />
                      <div className={styles.avatar_info}>
                        <p>Investocracy
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.21234 0.91996C6.08846 -0.306653 7.91149 -0.306653 8.78768 0.91996L8.92718 1.11524C9.08132 1.33112 9.34026 1.44671 9.60389 1.41742L10.2256 1.34833C11.6249 1.19287 12.8071 2.37516 12.6517 3.77437L12.5826 4.3961C12.5533 4.65976 12.6689 4.91865 12.8848 5.07285L13.0801 5.21234C14.3066 6.08846 14.3066 7.91149 13.0801 8.78768L12.8848 8.92718C12.6689 9.08132 12.5533 9.34026 12.5826 9.60389L12.6517 10.2256C12.8071 11.6249 11.6249 12.8071 10.2256 12.6517L9.60389 12.5826C9.34026 12.5533 9.08132 12.6689 8.92718 12.8848L8.78768 13.0801C7.91149 14.3066 6.08853 14.3066 5.21234 13.0801L5.07285 12.8848C4.91865 12.6689 4.65976 12.5533 4.39609 12.5826L3.77437 12.6517C2.37516 12.8071 1.19287 11.6249 1.34833 10.2256L1.41742 9.60389C1.44671 9.34026 1.33112 9.08132 1.11524 8.92718L0.91996 8.78768C-0.306653 7.91149 -0.306653 6.08853 0.91996 5.21234L1.11524 5.07285C1.33112 4.91865 1.44671 4.65976 1.41742 4.39609L1.34833 3.77437C1.19287 2.37516 2.37516 1.19287 3.77437 1.34833L4.3961 1.41742C4.65976 1.44671 4.91865 1.33112 5.07285 1.11524L5.21234 0.91996ZM9.71468 5.01762C10.0006 5.3036 10.0006 5.76728 9.71468 6.05323L6.91814 8.84977C6.55895 9.20903 5.97649 9.20903 5.6173 8.84977L4.28533 7.51781C3.99936 7.23185 3.99936 6.76817 4.28533 6.48221C4.57132 6.19625 5.03497 6.19625 5.32095 6.48221L6.26772 7.42899L8.67908 5.01762C8.96504 4.73165 9.42872 4.73165 9.71468 5.01762Z" fill="#31B2E9" />
                          </svg>
                        </p>
                        <span>@Investocrasy</span>
                      </div>
                    </div>

                    <p>{PostText}</p>

                    <Image src={postImage} alt='' />
                  </div>
                </div>
                <div className={styles.mobile_screen + " w-1/3"}>
                  <h6>Mobile View</h6>
                  <div className={styles.mobile_view}>
                    <div className={styles.avatar}>
                      <Image src={profileImg} alt='avatar' />
                      <div className={styles.avatar_info}>
                        <p>Investocracy
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.21234 0.91996C6.08846 -0.306653 7.91149 -0.306653 8.78768 0.91996L8.92718 1.11524C9.08132 1.33112 9.34026 1.44671 9.60389 1.41742L10.2256 1.34833C11.6249 1.19287 12.8071 2.37516 12.6517 3.77437L12.5826 4.3961C12.5533 4.65976 12.6689 4.91865 12.8848 5.07285L13.0801 5.21234C14.3066 6.08846 14.3066 7.91149 13.0801 8.78768L12.8848 8.92718C12.6689 9.08132 12.5533 9.34026 12.5826 9.60389L12.6517 10.2256C12.8071 11.6249 11.6249 12.8071 10.2256 12.6517L9.60389 12.5826C9.34026 12.5533 9.08132 12.6689 8.92718 12.8848L8.78768 13.0801C7.91149 14.3066 6.08853 14.3066 5.21234 13.0801L5.07285 12.8848C4.91865 12.6689 4.65976 12.5533 4.39609 12.5826L3.77437 12.6517C2.37516 12.8071 1.19287 11.6249 1.34833 10.2256L1.41742 9.60389C1.44671 9.34026 1.33112 9.08132 1.11524 8.92718L0.91996 8.78768C-0.306653 7.91149 -0.306653 6.08853 0.91996 5.21234L1.11524 5.07285C1.33112 4.91865 1.44671 4.65976 1.41742 4.39609L1.34833 3.77437C1.19287 2.37516 2.37516 1.19287 3.77437 1.34833L4.3961 1.41742C4.65976 1.44671 4.91865 1.33112 5.07285 1.11524L5.21234 0.91996ZM9.71468 5.01762C10.0006 5.3036 10.0006 5.76728 9.71468 6.05323L6.91814 8.84977C6.55895 9.20903 5.97649 9.20903 5.6173 8.84977L4.28533 7.51781C3.99936 7.23185 3.99936 6.76817 4.28533 6.48221C4.57132 6.19625 5.03497 6.19625 5.32095 6.48221L6.26772 7.42899L8.67908 5.01762C8.96504 4.73165 9.42872 4.73165 9.71468 5.01762Z" fill="#31B2E9" />
                          </svg>
                        </p>
                        <span>@Investocrasy</span>
                      </div>
                    </div>

                    <p>{PostText}</p>

                    <Image src={postImage} alt='' />

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>


        {/* buttons to move to last or next page */}
        <div className="flex justify-between items-center">
          <CustomBtn word="Back" btnColor="white" href="/social-media/post/choose-sub-brand" />
          <CustomBtn word="Publish " btnColor="black" onClick={handleNavigate} />
        </div>
      </>}


    </div>
  )
}

export default SchadulePost
