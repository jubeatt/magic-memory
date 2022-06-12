import Button from './components/Button';
import './index.css'
import Card from './components/Card';
import { useRef, useState, useEffect } from 'react';

const sleep = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))
const createRandomNumArray = (total) => {
	const res = new Array(0)
	while(res.length < total) {
		const num = Math.floor(Math.random() * total)
		if (res.some(n => n === num)) {
			continue
		} else {
			res.push(num)
		} 
	}
	return res
}

const initCards = [
  {src: './img/helmet-1.png', name:'helmet', isFlip: false},
  {src: './img/potion-1.png', name:'potion', isFlip: false},
  {src: './img/ring-1.png', name:'ring', isFlip: false},
  {src: './img/scroll-1.png', name:'scroll', isFlip: false},
  {src: './img/shield-1.png', name:'shield', isFlip: false},
  {src: './img/sword-1.png', name:'sword', isFlip: false},
  {src: './img/potion-1.png', name:'potion', isFlip: false},
  {src: './img/ring-1.png', name:'ring', isFlip: false},
  {src: './img/scroll-1.png', name:'scroll', isFlip: false},
  {src: './img/shield-1.png', name:'shield', isFlip: false},
  {src: './img/helmet-1.png', name:'helmet', isFlip: false},
  {src: './img/sword-1.png', name:'sword', isFlip: false},
]

export default function App() {
  const [cards, setCards] = useState(() => 
    createRandomNumArray(initCards.length).map(i => initCards[i])
  )
  const [modal, setModal] = useState(false)
  const [turns, setTurns] = useState(0)
  const firstCardIndex = useRef(undefined)
  const secondCardIndex = useRef(undefined)
  const comparing = useRef(false)
  
  const handleClick = (i) => {
    if (comparing.current) return
    !cards[firstCardIndex.current]?.name 
      ? firstCardIndex.current = i
      : secondCardIndex.current = i
    const newCards = cards.map((card, index) => index === i ? {...card, isFlip: true} : card)    
    setCards(newCards)
  }

  const newGame = async () => {
    firstCardIndex.current = undefined
    secondCardIndex.current = undefined
    setTurns(0)
    setModal(false)
    setCards(cards.map(item => ({...item, isFlip: false})))
    await sleep(1000)
    setCards(createRandomNumArray(initCards.length).map(i => initCards[i]))
  }

  const resetState = () => {
    firstCardIndex.current = undefined
    secondCardIndex.current = undefined
    comparing.current = false
    setTurns(prev => prev + 1)
  }

  useEffect(() => {
    const checkCard = async () => {
      // DO NOT HAVE TWO CHOICE
      if (!cards[firstCardIndex.current]?.name || !cards[secondCardIndex.current]?.name) return
      comparing.current = true
      await sleep(1000)
      if (cards.every(card => card.isFlip)) setModal(true)
      // NOT SAME CARD
      if (cards[firstCardIndex.current]?.name !== cards[secondCardIndex.current]?.name) {
        const newCard = cards.map(card => ({...card}))
        newCard[firstCardIndex.current].isFlip = false
        newCard[secondCardIndex.current].isFlip = false
        resetState()
        return setCards(newCard)
      }
      // SAME CARD
      resetState()
    }
    checkCard()
  }, [cards])
  


  return (
    <div className="container">
      <h1 className='mb-4 font-bold text-4xl'>Magic Match</h1>
      <Button title="New Game" onClick={newGame} />
      <p className='mt-4 text-left'>Turn: {turns}</p>
      <div className='grid grid-cols-4 mt-8 gap-4'>
        {cards.map((item, index) => 
          <Card
            key={index}
            onClick={() => handleClick(index)}
            {...item}
          />
        )}
      </div>
      {modal && 
        <div className='fixed top-2/4 left-0 -translate-y-1/2 right-0 bg-black-rgba py-14'>
          <h3 className='text-4xl font-semibold'>Congratulations!</h3>
        </div>
      }
    </div>
  );
}
