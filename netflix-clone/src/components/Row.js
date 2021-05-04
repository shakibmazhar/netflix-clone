import React from 'react';
import {useState, useEffect} from 'react';
import axios from '../axios';
import '../Row.css';
import Card from './Card';
import {Link} from 'react-router-dom'
import {useGlobalContext} from '../context'

function Row({title, fetchUrl, isLargeRow}) {
    //Global context
    const {setMovie} = useGlobalContext()

    //Base URL for poster images
    const base_URL = "https://image.tmdb.org/t/p/original/"

    //State for movies
    const [movies, setMovies] = useState([])
    
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

    //Link on Click handle
    const handleLinkClick = (id, name, description, poster) => {
       const idStr = id.toString()
       setMovie(idStr, name, description, poster)
    }

      return (
        
        <div className = 'row'>
            <h2>{title}</h2>
            <div className = "row_posters">
                {/* Row Posters */}
                {movies.map((movie) => (    
                    <Link to = {`/view/${movie.id}`}
                    key = {movie.id}
                    className = 'link_poster'
                    onClick = {() => {
                        handleLinkClick(
                            movie.id, 
                            movie.name || movie.original_name || movie.original_title,
                            movie.overview,
                            movie.poster_path
                        )}}
                    >            
                        <img
                        className = {`row_poster ${isLargeRow && 'row_posterLarge' }`}                
                        src = {`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt = {movie.name}
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
                    </Link>   
                ))}
            </div>
            {isHover && <Card
                        title = {movie_title}
                        poster = {movie_poster}
                        description = {movie_description}
                        posX = {position.x}
                        posY = {position.y}/>}
                                    
        </div>
    )
}

export default Row
