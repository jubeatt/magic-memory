import React from 'react'

export default function Button({ title, onClick }) {
  return (
    <button className='border-2 rounded text-2xl py-1 px-2 bg-transparent border-white font-bold hover:bg-rose-600' onClick={onClick}>{title}</button>
  )
}
