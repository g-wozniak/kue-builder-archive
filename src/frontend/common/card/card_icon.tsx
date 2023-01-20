import React from 'react'

type Props = {
   icon: string
   height: number
   alt: string
}

const CardIcon = ({icon, height, alt}: Props) => (
   <img src={`/assets/common/icons/${icon}.png`} height={height} alt={alt}/>
)

export default CardIcon
