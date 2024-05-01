'use client'
import styles from './employmentCarousel.module.css';
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { IosPickerItem } from './EmblaCarouselIosPickerItem'

type PropType = {
  loop?: EmblaOptionsType['loop']
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { loop } = props

  return (
    <div className={styles.embla}>
      <IosPickerItem
        slideCount={3}
        perspective="center"
        loop={loop}
        label="positions"
      />
    </div>
  )
}

export default EmblaCarousel
