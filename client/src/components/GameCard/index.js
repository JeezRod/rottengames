import React from 'react'
import './GameCard.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GameCard = ({ game }) => {
  return (
    <div className='gamecard'>
      <LazyLoadImage className='gameImage' effect='blur' src={game.imageurl} alt="" />
      <h2 className='gameTitle'>{game.name}</h2>
    </div>
  )
}

export default GameCard