import React from 'react'
import requests from '../requests'
import Row from './Row'

const Rows = () => {
    return (
        <>
            <Row title = 'Netflix Originals'
            fetchUrl = {requests.fetchNetflixOriginals}
            isLargeRow/>
            <Row title = 'Trending Now' 
            fetchUrl = {requests.fetchTrending}/>
            <Row title = 'Top Rated' 
            fetchUrl = {requests.fetchTopRated}/>
            <Row title = 'Action' 
            fetchUrl = {requests.fetchActionMovies}/>
            <Row title = 'Comedy' 
            fetchUrl = {requests.fetchComedyMovies}/>
            <Row title = 'Horror' 
            fetchUrl = {requests.fetchHorrorMovies}/>
            <Row title = 'Romance' 
            fetchUrl = {requests.fetchRomanceMovies}/>
            <Row title = 'Documentaries' 
            fetchUrl = {requests.fetchDocumentaries}/>
        </>
    )
}

export default Rows
