import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom' 
import {useGlobalContext} from '../context'
import movieTrailer from 'movie-trailer'
import '../Movie.css'
import YouTube from 'react-youtube'

const Movie = () => {
    //Global context
    const {movie} = useGlobalContext()
    //Base url for poster
    const baseURL = "https://image.tmdb.org/t/p/original/"
    //Trailer url state
    const [trailerUrl, setTrailerUrl] = useState('')
    //Video playback options
    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }
    //console.log(movie)
    //Search for trailer in YT
    const getTrailer = () => {
        movieTrailer( movie?.name || movie?.original_title || movie?.original_name || '')
             .then((url) => {
                 const urlParams = new URLSearchParams(new URL(url).search)
                 setTrailerUrl(urlParams.get('v'))
                 //console.log(trailerUrl)
              })
             .catch((error) => console.log(error))
    }

    useEffect(() => {
        getTrailer()
        return () => setTrailerUrl('')
    }, [])

    return (
        <section className = 'poster'>
            <img className = 'poster_img' 
            src = {`${baseURL}${movie.poster}`} 
            alt={movie.name}/>
            <div className="movie_info">
                <h2 className = 'title'>{movie.name}</h2>
                <p className = 'desc'>{movie.description}</p>
            </div>
            <div className = 'video'>
                {/* Show trailer if there is a trailerUrl */}
                {trailerUrl ? < YouTube videoId = {trailerUrl} opts = {opts} />
                : <p className = 'no_trailer'>Sorry! No trailer found.</p>}
            </div>
            <Link to ='/' className = 'button'>
                <p>Back Home</p>
            </Link>
            
        </section>
    )
}

export default Movie
