import React from 'react'
import '../Card.css'

function Card({title, poster, description, posX, posY}) {
    const base_URL = "https://image.tmdb.org/t/p/original/"

    //Returns ... after specified character number
    function turncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + " ..." : str
    }
    
    let style;
    // console.log('X: ' + posX, 'Y: ' + posY)
      //Passing page relative cursor position to div style
    if(posY < 2000){
        style = {
            left: posX,
            top: posY,
            position: 'absolute'
        }
    }
    else{
        style = {
            left: posX,
            top: posY -350,
            position: 'absolute'
        }
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
                <div className="line"></div>
                <p>{turncate(description, 150)}</p>
            </div>
        </div>
    )    
}


export default Card
