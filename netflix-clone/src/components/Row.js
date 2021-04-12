import React from 'react';
import {useState, useEffect} from 'react';
import axios from '../axios';
import '../Row.css';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import Card from './Card';

function Row({title, fetchUrl, isLargeRow}) {
    //Base URL for poster images
    const base_URL = "https://image.tmdb.org/t/p/original/"

    //State for movies
    const [movies, setMovies] = useState([])

    //State for trailer URL
    const [trailerUrl, setTrailerUrl] = useState('')
    
    //Runs on a spesific condition
    // [] represents dependencies. Blank to run once. Pass in a variable to run on variable change. 
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            //console.log(request)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])
    // console.log(movies);

    //Video playback options
    const opts = {
        height: '400',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }

    //On poster click function
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('')
        }
        else{            
             movieTrailer( movie?.name || movie?.original_title || movie?.original_name || '')
             .then((url) => {
                 const urlParams = new URLSearchParams(new URL(url).search)
                 setTrailerUrl(urlParams.get('v'))
                 console.log(trailerUrl)
              })
             .catch((error) => console.log(error))
        }
    }

    // Image hover identifier
    const [isHover, setHover] = useState(false)
    const [movie_title, setMovieTitle] = useState('')
    const [movie_poster, setMoviePoster] = useState('')
    const [movie_description, setMovieDescription] = useState('')

    //State storing mouse coordinates
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })


    //Changing state data on mouse move
    useEffect(() => {
        const mCord = (e) => {
            setPosition({x: e.pageX + 1, y: e.pageY + 1})           
        }
        window.addEventListener('mousemove', mCord)
        //console.log('X:'+ position.x, 'Y: '+ position.y)
        return() => {
            window.removeEventListener('mousemove', mCord)
        }
    })

      
    
      return (
        <div className = 'row'>
            <h2>{title}</h2>
            <div className = "row_posters">
                {/* Row Posters */}
                {movies.map((movie) => (
                    <img
                    key= {movie.id}
                    className = {`row_poster ${isLargeRow && 'row_posterLarge' }`}
                    src = {`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt = {movie.name}
                    onClick = {() => {
                        handleClick(movie)
                        // console.log(movie)
                    }}
                    onMouseEnter = {() => {
                        setHover(true)
                        setMovieTitle(movie.name || movie.original_name || movie.original_title || '')
                        setMoviePoster(movie.poster_path)
                        setMovieDescription(movie.overview)
                    }}
                    onMouseLeave = {() => {
                        setHover(false)
                        setMovieTitle('')
                        setMoviePoster('')
                        setMovieDescription('')                       
                    }}/>
                ))}
            </div>
            {isHover && <Card
                        title = {movie_title}
                        poster = {movie_poster}
                        description = {movie_description}
                        posX = {position.x}
                        posY = {position.y}
                        />}
            {/* Show trailer if there is a trailerUrl */}
            {trailerUrl && < YouTube videoId = {trailerUrl} opts = {opts} />}
        </div>
    )
}

export default Row
