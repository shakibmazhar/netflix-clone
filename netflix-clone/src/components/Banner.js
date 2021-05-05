import {useState, useEffect} from 'react'
import React from 'react'
import axios from '../axios'
import requests from '../requests'
import { useGlobalContext } from '../context.js'
import {Link} from 'react-router-dom'
import '../Banner.css'

function Banner() {
    //Global context
    const {setMovie} = useGlobalContext()
    //Movie storage
    const [storage, setStorage] = useState([])
    //State that selects a random movie
    const [randomMovie, setRandomMovie] = useState([])

    const fetchData = async() => {
        // Fetching Netflix Originals data from server
        const request = await axios.get(requests.fetchTrending)
        const data = request.data.results
        //Setting movie storage 
        setStorage(data)
        //Setting initial random movie pick
        setRandomMovie(
            request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]
        )
   }

    //Fetch data on render
    useEffect(() => {
        fetchData()
    }, [])


    //Change banner in every 10s
    useEffect(() => {
        const timeout = setInterval(() => {
            //console.log('interval open');
            setRandomMovie(
                storage[
                    Math.floor(Math.random() * storage.length - 1)
                ]
            )
        }, 10000);
        return () => {
            //console.log('interval closed');
            clearInterval(timeout)
        }
    })


    //Turncates description after n number of characters
    function turncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str
    }

    //Link onClick handler
    const handleClick = (id, name, description, poster) => {
        const idStr = id.toString()
        setMovie(idStr, name, description, poster)
    }

    return (
        <header className = 'banner'
        style = {{
            backgroundSize: 'cover',
            // ? checks if movie object has an entry. If false ignores image, prevents error. 
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}')`,
            backgroundPosition: 'center center'
            
        }}>
            <div className = 'banner_contents'>

                {/* Movie title */}
                <h1 className = 'banner_title'>
                    {randomMovie?.name || randomMovie?.title || randomMovie?.original_name}
                </h1>

                {/* Play and My List buttons for banner */}
                <div className = 'banner_buttons'>
                    <Link to = {`/view/${randomMovie?.id}`}>
                        <button className = 'banner_button'
                        onClick = {() => {
                            if(randomMovie){
                                handleClick(
                                    randomMovie?.id,
                                    randomMovie?.name || randomMovie?.title || randomMovie?.original_name,
                                    randomMovie?.overview,
                                    randomMovie?.poster_path
                                )
                                return
                            }
                            return    
                        }}>
                            Play
                        </button>
                    </Link>
                    <button className = 'banner_button'>My List</button>
                </div>               
                
                {/* Movie description */}
                <h1 className = 'banner_description'>
                    {turncate(randomMovie?.overview, 300)}
                </h1>
            </div> 
            
            <div className = 'banner_fadeBottom'></div>
        </header>
    )
}

export default Banner
