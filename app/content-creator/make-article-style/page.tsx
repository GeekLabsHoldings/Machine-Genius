import styles from './make-article-style.module.css'
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'

const fontStyleOptions = ['Arial',
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
                    <label htmlFor="">Font</label>
                    <CustomSelectInput options={fontStyleOptions} />
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
