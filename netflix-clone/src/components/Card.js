import React from 'react'
import '../Card.css'

function Card({title, poster, description, posX, posY}) {
    const base_URL = "https://image.tmdb.org/t/p/original/"
    
      //Passing page relative cursor position to div style
    const style = {
        left: posX,
        top: posY,
        position: 'absolute'
    }
    
    return (
        <div 
        id = 'cursor' 
        className="tooltip"
        style = {style}>
            <img 
            className = 'tool_img' 
            src= {`${base_URL}${poster}`}
            alt = 'Poster' />
            <div className="tool-body">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )    
}


export default Card
