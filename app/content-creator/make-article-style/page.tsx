'use client'
import styles from './make-article-style.module.css'
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'

const fontFamilyOptions = ['Arial',
    'Arial Black',
    'Bahnschrift',
    'Calibri',
    'Cambria',
    'Cambria Math',
    'Candara',
    'Comic Sans MS',
    'Consolas',
    'Constantia',
    'Corbel',
    'Courier New',
    'Ebrima',
    'Franklin Gothic Medium',
    'Gabriola',
    'Gadugi',
    'Georgia',
    'HoloLens MDL2 Assets',
    'Impact',
    'Ink Free',
    'Javanese Text',
    'Leelawadee UI',
    'Lucida Console',
    'Lucida Sans Unicode',
    'Malgun Gothic',
    'Marlett',
    'Microsoft Himalaya',
    'Microsoft JhengHei',
    'Microsoft New Tai Lue',
    'Microsoft PhagsPa',
    'Microsoft Sans Serif',
    'Microsoft Tai Le',
    'Microsoft YaHei',
    'Microsoft Yi Baiti',
    'MingLiU-ExtB',
    'Mongolian Baiti',
    'MS Gothic',
    'MV Boli',
    'Myanmar Text',
    'Nirmala UI',
    'Palatino Linotype',
    'Segoe MDL2 Assets',
    'Segoe Print',
    'Segoe Script',
    'Segoe UI',
    'Segoe UI Historic',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'SimSun',
    'Sitka',
    'Sylfaen',
    'Symbol',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Webdings',
    'Wingdings',
    'Yu Gothic',]

const fontWeightOptions = [
    'Bold',
    'Semi Bold',
    'Normal',
]

const fontStyleOptions = [
    'Body',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
]

const fontSizeOptions = [12, 16, 20, 22, 26, 30]
const MakeArticleStyle = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center py-[2vw] h-[100%] gap-[2vw]">
                <div className={styles.article_wrapper + ' w-2/3 h-full'}>
                    <div className={styles.header}>
                        <h6>Article Preview</h6>
                    </div>
                    <ArticlePreview height="h-full" withEdit={false} yourNewArticle={true} />
                </div>
                <div className={styles.style_options_wrapper + ' w-1/3 h-full'}>
                    <div className={styles.header}>
                        <h6>Stylize</h6>
                    </div>
                    <div className={styles.style_options_container}>
                        <div>
                            <label htmlFor="">Font</label>
                            <CustomSelectInput options={fontFamilyOptions} />
                            <div className='flex gap-[1vw] mt-[1vw]'>
                                <div className="w-2/3">
                                    <CustomSelectInput options={fontWeightOptions} />
                                </div>
                                <div className="w-1/3">
                                    <CustomSelectInput options={fontSizeOptions} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Text Style</label>
                            <CustomSelectInput options={fontStyleOptions} />
                        </div>
                        <div>
                            <label htmlFor="">Style</label>
                            <div className={styles.custom_radio_input}>
                                <label htmlFor="Bold" className='font-bold'>
                                    B
                                    <input type="radio" name='font-style' id='Bold' />
                                </label>
                                <label htmlFor="Italic" className='italic'>
                                    I
                                    <input type="radio" name='font-style' id='Italic' />
                                </label>
                                <label htmlFor="Underline" className='underline'>
                                    U
                                    <input type="radio" name='font-style' id='Underline' />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Alignment</label>
                            <div className={styles.custom_radio_input}>
                                <label htmlFor="alien-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 23" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9242 3.2852C28.3598 3.2852 28.7776 3.11214 29.0857 2.80409C29.3937 2.49604 29.5668 2.07824 29.5668 1.6426C29.5668 1.20695 29.3937 0.789153 29.0857 0.481106C28.7776 0.173059 28.3598 0 27.9242 0H1.6426C1.20695 0 0.789153 0.173059 0.481106 0.481106C0.173059 0.789153 0 1.20695 0 1.6426C0 2.07824 0.173059 2.49604 0.481106 2.80409C0.789153 3.11214 1.20695 3.2852 1.6426 3.2852H27.9242ZM27.9242 9.85559C28.3598 9.85559 28.7776 9.68253 29.0857 9.37449C29.3937 9.06644 29.5668 8.64864 29.5668 8.21299C29.5668 7.77735 29.3937 7.35955 29.0857 7.0515C28.7776 6.74345 28.3598 6.5704 27.9242 6.5704H14.7834C14.3477 6.5704 13.9299 6.74345 13.6219 7.0515C13.3138 7.35955 13.1408 7.77735 13.1408 8.21299C13.1408 8.64864 13.3138 9.06644 13.6219 9.37449C13.9299 9.68253 14.3477 9.85559 14.7834 9.85559H27.9242ZM29.5668 14.7834C29.5668 15.219 29.3937 15.6368 29.0857 15.9449C28.7776 16.2529 28.3598 16.426 27.9242 16.426H1.6426C1.20695 16.426 0.789153 16.2529 0.481106 15.9449C0.173059 15.6368 0 15.219 0 14.7834C0 14.3477 0.173059 13.9299 0.481106 13.6219C0.789153 13.3139 1.20695 13.1408 1.6426 13.1408H27.9242C28.3598 13.1408 28.7776 13.3139 29.0857 13.6219C29.3937 13.9299 29.5668 14.3477 29.5668 14.7834ZM27.9242 22.9964C28.3598 22.9964 28.7776 22.8233 29.0857 22.5153C29.3937 22.2072 29.5668 21.7894 29.5668 21.3538C29.5668 20.9181 29.3937 20.5003 29.0857 20.1923C28.7776 19.8842 28.3598 19.7112 27.9242 19.7112H14.7834C14.3477 19.7112 13.9299 19.8842 13.6219 20.1923C13.3138 20.5003 13.1408 20.9181 13.1408 21.3538C13.1408 21.7894 13.3138 22.2072 13.6219 22.5153C13.9299 22.8233 14.3477 22.9964 14.7834 22.9964H27.9242Z" />
                                    </svg>
                                    <input type="radio" name='text-alignment' id='alien-right' />
                                </label>
                                <label htmlFor="alien-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 23" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9242 3.2852C28.3598 3.2852 28.7776 3.11214 29.0857 2.80409C29.3937 2.49604 29.5668 2.07824 29.5668 1.6426C29.5668 1.20695 29.3937 0.789153 29.0857 0.481106C28.7776 0.173059 28.3598 0 27.9242 0H1.6426C1.20695 0 0.789153 0.173059 0.481106 0.481106C0.173059 0.789153 0 1.20695 0 1.6426C0 2.07824 0.173059 2.49604 0.481106 2.80409C0.789153 3.11214 1.20695 3.2852 1.6426 3.2852H27.9242ZM21.3538 9.85559C21.7894 9.85559 22.2072 9.68253 22.5153 9.37449C22.8233 9.06644 22.9964 8.64864 22.9964 8.21299C22.9964 7.77735 22.8233 7.35955 22.5153 7.0515C22.2072 6.74345 21.7894 6.5704 21.3538 6.5704H8.21299C7.77735 6.5704 7.35955 6.74345 7.0515 7.0515C6.74345 7.35955 6.57039 7.77735 6.57039 8.21299C6.57039 8.64864 6.74345 9.06644 7.0515 9.37449C7.35955 9.68253 7.77735 9.85559 8.21299 9.85559H21.3538ZM29.5668 14.7834C29.5668 15.219 29.3937 15.6368 29.0857 15.9449C28.7776 16.2529 28.3598 16.426 27.9242 16.426H1.6426C1.20695 16.426 0.789153 16.2529 0.481106 15.9449C0.173059 15.6368 0 15.219 0 14.7834C0 14.3477 0.173059 13.9299 0.481106 13.6219C0.789153 13.3139 1.20695 13.1408 1.6426 13.1408H27.9242C28.3598 13.1408 28.7776 13.3139 29.0857 13.6219C29.3937 13.9299 29.5668 14.3477 29.5668 14.7834ZM21.3538 22.9964C21.7894 22.9964 22.2072 22.8233 22.5153 22.5153C22.8233 22.2072 22.9964 21.7894 22.9964 21.3538C22.9964 20.9181 22.8233 20.5003 22.5153 20.1923C22.2072 19.8842 21.7894 19.7112 21.3538 19.7112H8.21299C7.77735 19.7112 7.35955 19.8842 7.0515 20.1923C6.74345 20.5003 6.57039 20.9181 6.57039 21.3538C6.57039 21.7894 6.74345 22.2072 7.0515 22.5153C7.35955 22.8233 7.77735 22.9964 8.21299 22.9964H21.3538Z" />
                                    </svg>
                                    <input type="radio" name='text-alignment' id='alien-center' />
                                </label>
                                <label htmlFor="alien-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 23" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9242 3.2852C28.3598 3.2852 28.7776 3.11214 29.0857 2.80409C29.3937 2.49604 29.5668 2.07824 29.5668 1.6426C29.5668 1.20695 29.3937 0.789153 29.0857 0.481106C28.7776 0.173059 28.3598 0 27.9242 0H1.6426C1.20695 0 0.789153 0.173059 0.481106 0.481106C0.173059 0.789153 0 1.20695 0 1.6426C0 2.07824 0.173059 2.49604 0.481106 2.80409C0.789153 3.11214 1.20695 3.2852 1.6426 3.2852H27.9242ZM14.7834 9.85559C15.219 9.85559 15.6368 9.68253 15.9449 9.37449C16.2529 9.06644 16.426 8.64864 16.426 8.21299C16.426 7.77735 16.2529 7.35955 15.9449 7.0515C15.6368 6.74345 15.219 6.5704 14.7834 6.5704H1.6426C1.20695 6.5704 0.789153 6.74345 0.481106 7.0515C0.173059 7.35955 0 7.77735 0 8.21299C0 8.64864 0.173059 9.06644 0.481106 9.37449C0.789153 9.68253 1.20695 9.85559 1.6426 9.85559H14.7834ZM29.5668 14.7834C29.5668 15.219 29.3937 15.6368 29.0857 15.9449C28.7776 16.2529 28.3598 16.426 27.9242 16.426H1.6426C1.20695 16.426 0.789153 16.2529 0.481106 15.9449C0.173059 15.6368 0 15.219 0 14.7834C0 14.3477 0.173059 13.9299 0.481106 13.6219C0.789153 13.3139 1.20695 13.1408 1.6426 13.1408H27.9242C28.3598 13.1408 28.7776 13.3139 29.0857 13.6219C29.3937 13.9299 29.5668 14.3477 29.5668 14.7834ZM14.7834 22.9964C15.219 22.9964 15.6368 22.8233 15.9449 22.5153C16.2529 22.2072 16.426 21.7894 16.426 21.3538C16.426 20.9181 16.2529 20.5003 15.9449 20.1923C15.6368 19.8842 15.219 19.7112 14.7834 19.7112H1.6426C1.20695 19.7112 0.789153 19.8842 0.481106 20.1923C0.173059 20.5003 0 20.9181 0 21.3538C0 21.7894 0.173059 22.2072 0.481106 22.5153C0.789153 22.8233 1.20695 22.9964 1.6426 22.9964H14.7834Z" />
                                    </svg>
                                    <input type="radio" name='text-alignment' id='alien-left' />
                                </label>
                                <label htmlFor="alien-justify">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 23" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9242 3.2852C28.3598 3.2852 28.7776 3.11214 29.0857 2.80409C29.3937 2.49604 29.5668 2.07824 29.5668 1.6426C29.5668 1.20695 29.3937 0.789153 29.0857 0.481106C28.7776 0.173059 28.3598 0 27.9242 0H1.6426C1.20695 0 0.789153 0.173059 0.481106 0.481106C0.173059 0.789153 0 1.20695 0 1.6426C0 2.07824 0.173059 2.49604 0.481106 2.80409C0.789153 3.11214 1.20695 3.2852 1.6426 3.2852H27.9242ZM27.9242 9.85559C28.3598 9.85559 28.7776 9.68253 29.0857 9.37449C29.3937 9.06644 29.5668 8.64864 29.5668 8.21299C29.5668 7.77735 29.3937 7.35955 29.0857 7.0515C28.7776 6.74345 28.3598 6.5704 27.9242 6.5704H1.6426C1.20695 6.5704 0.789153 6.74345 0.481106 7.0515C0.173059 7.35955 0 7.77735 0 8.21299C0 8.64864 0.173059 9.06644 0.481106 9.37449C0.789153 9.68253 1.20695 9.85559 1.6426 9.85559H27.9242ZM29.5668 14.7834C29.5668 15.219 29.3937 15.6368 29.0857 15.9449C28.7776 16.2529 28.3598 16.426 27.9242 16.426H1.6426C1.20695 16.426 0.789153 16.2529 0.481106 15.9449C0.173059 15.6368 0 15.219 0 14.7834C0 14.3477 0.173059 13.9299 0.481106 13.6219C0.789153 13.3139 1.20695 13.1408 1.6426 13.1408H27.9242C28.3598 13.1408 28.7776 13.3139 29.0857 13.6219C29.3937 13.9299 29.5668 14.3477 29.5668 14.7834ZM27.9242 22.9964C28.3598 22.9964 28.7776 22.8233 29.0857 22.5153C29.3937 22.2072 29.5668 21.7894 29.5668 21.3538C29.5668 20.9181 29.3937 20.5003 29.0857 20.1923C28.7776 19.8842 28.3598 19.7112 27.9242 19.7112H1.6426C1.20695 19.7112 0.789153 19.8842 0.481106 20.1923C0.173059 20.5003 0 20.9181 0 21.3538C0 21.7894 0.173059 22.2072 0.481106 22.5153C0.789153 22.8233 1.20695 22.9964 1.6426 22.9964H27.9242Z" />
                                    </svg>
                                    <input type="radio" name='text-alignment' id='alien-justify' />
                                </label>
                            </div>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <label htmlFor="upload-image">Upload Images</label>
                            <div className={styles.choose_image_input}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30 2.5C35.5228 2.5 40 6.97715 40 12.5V27.5C40 33.0228 35.5228 37.5 30 37.5H10C4.47715 37.5 0 33.0228 0 27.5V12.5C0 6.97715 4.47715 2.5 10 2.5H30ZM34.958 15.0213C34.4666 14.5365 33.6751 14.5418 33.1903 15.0332L23.1092 25.2513L13.9721 16.1141L13.8388 15.9924C13.0165 15.3069 11.7986 15.4289 11.0321 16.1955L4.58779 22.6398L4.49066 22.7488C4.10213 23.2394 4.13451 23.9542 4.58779 24.4075L4.69682 24.5047C5.18747 24.8932 5.90227 24.8608 6.35556 24.4075L12.5434 18.2196L24.9171 30.5947L25.0261 30.6918C25.5168 31.0804 26.2316 31.048 26.6849 30.5947C27.173 30.1066 27.173 29.3151 26.6849 28.8269L24.8767 27.0187L34.9699 16.7891L35.0663 16.6794C35.4515 16.1861 35.4143 15.4716 34.958 15.0213ZM23.25 8.75C20.4886 8.75 18.25 10.9886 18.25 13.75C18.25 16.5114 20.4886 18.75 23.25 18.75C26.0114 18.75 28.25 16.5114 28.25 13.75C28.25 10.9886 26.0114 8.75 23.25 8.75ZM23.25 11.25C24.6307 11.25 25.75 12.3693 25.75 13.75C25.75 15.1307 24.6307 16.25 23.25 16.25C21.8693 16.25 20.75 15.1307 20.75 13.75C20.75 12.3693 21.8693 11.25 23.25 11.25Z" fill="#202327" />
                                </svg>
                                <input type="file" id="imageUpload" name="image" accept="image/*" multiple />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full">
                <CustomBtn word={"Back"} btnColor="white" href={"/content-creator/generating-titles"} />
                <CustomBtn word={"Next"} btnColor="black" href={"/content-creator/images-generating-titles"} />
            </div>
        </div>
    )
}

export default MakeArticleStyle
