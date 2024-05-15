 import { EmblaOptionsType } from 'embla-carousel';
import styles from './templates.module.css';
import EmblaCarousel from '@/app/_components/CardsCarousel/CardsCarousel';

 const Templates = ()=>{
        const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' }
        const SLIDE_COUNT = 10
        const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    return(
        <div className='w-full h-full flex flex-col gap-[1vw]'>
           
            <div className="flex w-full ">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />

            </div>

        </div>
    )
 }
 export default Templates