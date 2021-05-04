import './App.css';
import Rows from './components/Rows'
import Banner from './components/Banner'
import Nav from './components/Nav'
import Error from './components/Error'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import Movie from './components/Movie';

function App() {
  return (

    <div className="App">      
      <Router>
        {/* Nav Bar */}
        <Nav />
        <Switch>
        <Route exact path = '/'>
          {/* Banner */}
          <Banner />
          {/* Row Initialization */}
          <Rows />
        </Route>
        <Route path = '/view/:id'>
          {/* Movie route */}
          <Movie />
        </Route>
        <Route path = '*'>
          {/* Error route */}
          <Error />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
