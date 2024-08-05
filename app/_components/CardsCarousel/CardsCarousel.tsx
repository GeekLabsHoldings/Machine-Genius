'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styles from './cardsCarousel.module.css'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className={`${styles.embla} w-full`} >
           <div className={`${styles.embla__controls} `}>
            <div>
            <h4>Template Groups</h4>
            </div>
        <div className={`${styles.embla__buttons} flex w-fit `}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className={`${styles.embla__viewport}` } ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__number}>
              <div className={`${styles.cardHeader}`}>
              <div >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="25" viewBox="0 0 36 25" fill="none">
              <path d="M32.431 0H3.2832C1.47014 0 0 1.54727 0 3.45676V21.5433C0 23.4521 1.47014 25 3.2832 25H32.4311C34.2441 25 35.7143 23.4521 35.7143 21.5433V3.45676C35.7142 1.54727 34.2441 0 32.431 0ZM8.5975 5.99299C10.4087 5.99299 11.8778 7.5396 11.8778 9.44725C11.8778 11.3548 10.4087 12.9008 8.5975 12.9008C6.7857 12.9008 5.3173 11.3548 5.3173 9.44725C5.3173 7.5396 6.7857 5.99299 8.5975 5.99299ZM8.5975 19.3239C6.34409 19.3239 4.03633 18.5023 4.39627 16.2281C4.54289 15.3045 5.26875 14.01 5.81974 13.4298C5.89061 13.3552 6.21399 13.3358 6.30209 13.3931C6.97069 13.8269 7.7557 14.0808 8.5975 14.0808C9.4393 14.0808 10.2237 13.8269 10.8923 13.3931C10.9804 13.3358 11.3037 13.3552 11.3753 13.4298C11.9256 14.01 12.6515 15.3045 12.7981 16.2281C13.1582 18.5023 10.8504 19.3239 8.5975 19.3239ZM25.5597 18.1911H16.1965V16.2082H25.5596V18.1911H25.5597ZM31.1583 13.3129H16.1965V11.3299H31.1583V13.3129ZM31.1583 8.43456H16.1965V6.45163H31.1583V8.43456Z" fill="#2A2B2A"/>
            </svg>
            <h5>Job Listings </h5>
              </div>
            <button><svg xmlns="http://www.w3.org/2000/svg" width="7" height="25" viewBox="0 0 7 25" fill="none">
            <path d="M0 22.1641L0 21.4801C0.0168611 21.4245 0.0443718 21.3747 0.0559083 21.3191C0.29995 19.8803 1.61955 18.744 3.16722 18.6482C4.89769 18.538 6.36194 19.4328 6.83849 20.891C6.89972 21.0825 6.94409 21.2837 6.99911 21.4793V22.1633C6.98225 22.2084 6.95474 22.2486 6.94942 22.2993C6.7107 23.6271 5.65733 24.6379 4.21526 24.9244C4.10433 24.9445 3.99341 24.9751 3.88248 25H3.12817C3.07847 24.9847 3.02789 24.9598 2.97819 24.9549C1.53613 24.7441 0.438388 23.813 0.105604 22.5206C0.0727691 22.3951 0.0337221 22.28 0 22.1641ZM7 2.83107V3.5151C6.98314 3.57062 6.95563 3.62052 6.9503 3.67604C6.70094 5.12457 5.37513 6.25604 3.8106 6.34697C2.08545 6.44756 0.626521 5.54223 0.155299 4.07841C0.0940671 3.89252 0.0496957 3.70099 0 3.5151L0 2.83107C0.0168611 2.786 0.0443718 2.74577 0.0559083 2.7007C0.322135 1.393 1.15986 0.537565 2.55756 0.130368C2.74036 0.0748407 2.93471 0.0450653 3.12284 0L3.87715 0C3.92685 0.01529 3.97743 0.0402369 4.02713 0.0450654C5.47452 0.26154 6.56782 1.18699 6.90061 2.4794C6.93433 2.60011 6.96628 2.71599 7 2.83107ZM6.99911 12.1556V12.8396C6.98225 12.8951 6.95474 12.945 6.9432 13.0005C6.69384 14.4442 5.31833 15.6063 3.76534 15.6666C2.018 15.7367 0.537779 14.7814 0.121577 13.308C0.0772059 13.1518 0.0381592 12.9965 0 12.8404L0 12.1564C0.0168611 12.1008 0.0443718 12.051 0.0559083 11.9954C0.29995 10.5517 1.68078 9.38969 3.23377 9.3245C4.98111 9.24886 6.46133 10.2097 6.87753 11.6832C6.92191 11.8441 6.96095 12.0003 6.99911 12.1564V12.1556Z" fill="#2A2B2A"/>
          </svg></button>
              </div>

              <div className={styles.jobCard}>
                <h6>Video Editor</h6>
                <span>Beginner</span>

              </div>
                </div>
            </div>
          ))}
        </div>
      </div>

 
    </section>
  )
}

export default EmblaCarousel
