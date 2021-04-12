import './App.css';
import Row from './components/Row'
import requests from './requests'
import Banner from './components/Banner'
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
      
      {/* Nav Bar */}
      <Nav />

      {/* Banner */}
      <Banner />

      {/* Rows */}
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
    </div>
  );
}

export default App;