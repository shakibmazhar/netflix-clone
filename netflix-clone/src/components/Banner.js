import {useState, useEffect} from 'react'
import React from 'react'
import axios from '../axios'
import requests from '../requests'
import '../Banner.css'

function Banner() {
    //State that selects a random movie
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData(){
            // Fetching Netflix Originals data from server
           const request = await axios.get(requests.fetchNetflixOriginals)
           setMovie(
               // Selecting a random movies from results array
               request.data.results[
                   Math.floor(Math.random() * request.data.results.length -1)]
           )
            
        }
        fetchData()
    }, [])
    // console.log(movie)

    //Turncates description after n number of characters
    function turncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str
    }

    return (
        <header className = 'banner'
        style = {{
            backgroundSize: 'cover',
            // ? checks if movie object has an entry. If false ignores image, prevents error. 
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition: 'center center'
            
        }}>
            <div className = 'banner_contents'>

                {/* Movie title */}
                <h1 className = 'banner_title'>
                    {movie?.name || movie?.title || movie?.original_name}
                </h1>

                {/* Play and My List buttons for banner */}
                <div className = 'banner_buttons'>
                    <button className = 'banner_button'>Play</button>
                    <button className = 'banner_button'>My List</button>
                </div>               
                
                {/* Movie description */}
                <h1 className = 'banner_description'>
                    {turncate(movie.overview, 300)}
                </h1>
            </div> 
            
            <div className = 'banner_fadeBottom'></div>
        </header>
    )
}

export default Banner
