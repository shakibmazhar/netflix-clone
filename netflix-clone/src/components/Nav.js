import {useState, useEffect} from 'react'
import React from 'react'
import '../Nav.css'

function Nav() {

    //State defining show var
    const [show, handleShow] = useState(false)
    
    //Black bar appear on scroll down 
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100){
                handleShow(true)
            }
            else handleShow(false)
        })
        return () => {
            // To prevent redundency of event listeners
            window.removeEventListener('scroll' )
        }
    }, [])

    return (
        <div className = {`nav ${show && 'nav_black'}`}>
            <img className = 'nav_logo'
            src = 'https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png'
            alt = 'Netflix Logo' />
            
            <img className = 'nav_avatar'
            src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt = 'Netflix Avatar' />
            
        </div>
    )
}

export default Nav
