import React from 'react'

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    !disabled && handleChoice(card)
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front" />
        <img 
          className="back"
          src="./img/cover.png"
          alt="back"
          onClick={handleClick} />
      </div>
    </div>
  )
}
