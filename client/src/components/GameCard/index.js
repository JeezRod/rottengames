import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GameCard = ({ game }) => {
  return (
    <div className='gamecard flex flex-col'>
      <LazyLoadImage className='gameImage w-full h-96 object-cover' effect='blur' src={game.imageurl} alt="" />
      <h2 className='gameTitle pt-3 text-xl dark:text-white'>{game.name}</h2>
    </div>
  )
}

export default GameCard