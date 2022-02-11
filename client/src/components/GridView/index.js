import React from 'react'
import GameCard from '../GameCard'
import data from '../sample.json'
import './GridView.css'

const GridView = () => {
  return (
    <div className='gridview'>
        {data.map(game => {
            return <GameCard key={game._id.$oid} game={game}/>
        })}
    </div>
  )
}

export default GridView