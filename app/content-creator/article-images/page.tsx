'use client'

import ArticlePreview from '@/app/_components/ArticlePreview/ArticlePreview';
import styles from './article-images.module.css';
import CustomBtn from '@/app/_components/Button/CustomBtn';
import { useRef, useState } from 'react';

interface imgStore{
    image :string,
    id:string,

}

const ArticleImages = ()=>{
    const [images, setImages] = useState<imgStore[]>([]);

    const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files ){
            setImages([...images, {id:event.target.id,image:URL.createObjectURL(event.target.files[0])}])
        }
    };

    const renderSpecificImg = (elementId:imgStore['id']) =>{
        
        return images.map((image)=>(
            image.id === elementId ? <img src={image['image']} alt="" /> :  null
        )) 
    }

    return(
        <div className="flex flex-col ">
        <div className="flex justify-center items-center h-[80vh] w-full gap-[10vw] ">
        <div className="w-5/12 flex flex-col gap-[1vw]">

        <div className={`${styles.header}`}>
            <h3>Article Images</h3>
          </div>
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col  gap-[1.5vw]">
                <div className="w-11/12 mx-auto flex flex-col gap-[0.8vw] ">

                <div className={`${styles.imgWrapper} flex justify-center items-center overflow-hidden h-[15vh] `}>
                    <input className='hidden' type="file" id='first-img' name='article-image' onChange={(e)=>{handleImageChange(e)}} />
                     <label className='cursor-pointer' htmlFor="first-img">
                    <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
                    </svg>
                    </label>
                    {renderSpecificImg('first-img')}
                </div>


                    <div className={styles.generatingInput}>
            <input type="text" placeholder="Alt Text" />
            </div>

                </div>
                <div className="w-11/12 mx-auto flex flex-col gap-[0.8vw] ">

                <div className={`${styles.imgWrapper} flex justify-center items-center overflow-hidden h-[15vh] `}>
                    <input className='hidden' type="file" id='second-img' name='article-image' onChange={(e)=>{handleImageChange(e)}} />
                     <label className='cursor-pointer' htmlFor="second-img">
                    <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
                    </svg>
                    </label>
                    {renderSpecificImg('second-img')}
                </div>


                    <div className={styles.generatingInput}>
                <input type="text" placeholder="Alt Text" />
                </div>

                </div>

                <div className="w-11/12 mx-auto flex flex-col gap-[0.8vw]">
                <div className={`${styles.imgWrapper} flex justify-center items-center overflow-hidden h-[15vh] `}>
                    <input className='hidden' type="file" id='third-img' name='article-image' onChange={(e)=>{handleImageChange(e)}} />
                     <label className='cursor-pointer' htmlFor="third-img">
                    <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
                    </svg>
                    </label>
                    {renderSpecificImg('third-img')}
                </div>
                    
                    <div className={styles.generatingInput}>
            <input type="text" placeholder="Alt Text" />
            </div>

                </div>   

              
            </div>

            <div className="w-1/2 flex flex-col gap-[1.5vw]">
                <div className="w-11/12 mx-auto flex flex-col gap-[0.8vw]">
                <div className={`${styles.imgWrapper} flex justify-center items-center overflow-hidden h-[15vh] `}>
                    <input className='hidden' type="file" id='forth-img' name='article-image' onChange={(e)=>{handleImageChange(e)}} />
                    
                         <label className='cursor-pointer' htmlFor="forth-img">
                        <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
                        </svg>
                        </label>
                        {renderSpecificImg('forth-img') }
                  
             
                   
                </div>
                    <div className={styles.generatingInput}>
            <input type="text" placeholder="Alt Text" />
            </div>

                </div>
                <div className="w-11/12 mx-auto flex flex-col gap-[0.8vw]">
                <div className={`${styles.imgWrapper} flex justify-center items-center overflow-hidden h-[15vh] `}>
                    <input className='hidden' type="file" id='fifth-img' name='article-image' onChange={(e)=>{handleImageChange(e)}} />
                     <label className='cursor-pointer' htmlFor="fifth-img">
                    <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
                    </svg>
                    </label>
                    {renderSpecificImg('fifth-img')}
                </div>
                    
                    <div className={styles.generatingInput}>
            <input type="text" placeholder="Alt Text" />
            </div>

                </div>
                <div className="w-11/12 mx-auto flex flex-col gap-[0.8vw]">
                <div className={`${styles.imgWrapper} flex justify-center items-center overflow-hidden h-[15vh] `}>
                    <input className='hidden' type="file" id='sixth-img' name='article-image' onChange={(e)=>{handleImageChange(e)}} />
                     {!renderSpecificImg('sixth-img') ? null :  <label className='cursor-pointer' htmlFor="sixth-img">
                    <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
                    </svg>
                    </label>}
                    {renderSpecificImg('sixth-img')}
                </div>
                    
                    <div className={styles.generatingInput}>
            <input type="text" placeholder="Alt Text" />
            </div>

                </div>
                
            </div>

          </div>


            </div>

             {/* Article part */}
        <div className={`w-7/12`}>
           {/* yourNewArticle should be true but till fixing selection bug */}
          <ArticlePreview height="h-[75vh]" withEdit={false} yourNewArticle={false}/>
        </div>
            </div>
            
                  {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/choose-articles"}
        />
        <CustomBtn
          word={"Schedule"}
          btnColor="black"
          href={"/content-creator/schedule-script"}
        />
      </div>
            </div>
    )

}

export default ArticleImages