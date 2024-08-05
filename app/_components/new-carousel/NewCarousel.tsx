'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './newCarousel.module.css'

// carousel component has a wheel shape

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [])

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide,index)=>(
            <div className={styles.embla__slide} key={index}>
                <div className={styles.embla__slide__number}>
                    {slide}
                </div>
                </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel