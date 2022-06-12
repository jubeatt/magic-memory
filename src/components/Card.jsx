import React from 'react'

export default function Card({ src, name, isFlip, onClick}) {

  return (
    <div className='relative'>
      <div className={`absolute duration-200  ${isFlip ? 'rotateY-0 delay-200' : 'rotateY-90'}`}>
        <img className='w-full border border-white rounded' src={src} alt={name} />
      </div>
      <div className={`duration-200 ${isFlip ? 'rotateY-90 delay-0' : 'rotateY-0 delay-200'}`} 
        onClick={onClick}>
        <img className='w-full cursor-pointer hover:brightness-125 transition duration-300 border border-white rounded' src="./img/cover.png" alt="cover" />
      </div>
    </div>
  )
}
