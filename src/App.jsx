import { useEffect, useState } from "react";
import Card from "./components/Card";

const initCards = [
  {src: './img/helmet-1.png', matched: false },
  {src: './img/potion-1.png', matched: false },
  {src: './img/ring-1.png', matched: false },
  {src: './img/scroll-1.png', matched: false },
  {src: './img/shield-1.png', matched: false },
  {src: './img/sword-1.png', matched: false },
]


export default function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCard = () => {
    const shuffledCards = [...initCards, ...initCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}))
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(0)
    setCards(shuffledCards)
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  // First start game
  useEffect(() => {
    shuffleCard()
  }, [])

  // Every time when choose a card
  useEffect(() => {
    if (!firstChoice || !secondChoice) return
    setDisabled(true)
    if (firstChoice.src === secondChoice.src) {
      setCards(prev => prev.map(card =>
        card.src === firstChoice.src ? {...card, matched: true} : card))
    }
    setTimeout(resetTurn, 1000)
    
  }, [firstChoice, secondChoice])

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }


  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Magic match</h1>
        <button className="btn" onClick={shuffleCard}>New Game</button>
      </div>

      {/* firstChoice & secondChoice 存的都是 reference，
          所以才可以直接跟 card 比較  */}
      <div className="card-grid">
        {cards.map(card => 
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
          />)}
      </div>

      <p>Turns {turns}</p>
    </div>
  );
}