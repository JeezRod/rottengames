import React from 'react'
import './GameCard.css'

const GameCard = ({ game }) => {
  return (
    <div className='gamecard'>
      <img className='gameImage' src={game.imageurl} alt="" />
      <h2 className='gameTitle'>{game.name}</h2>
    </div>
  )
}

export default GameCard