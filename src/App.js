import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="App-navbar">
            <Navbar  fixed="top"/>
          </div>
          <br/>
          <div className="App-page">
            <Route path="/practice"/>
            <Route path="/test" component={Main}/>
            <Route path="/typeassist"/>
            <Route path="/characterlist"/>
            <Route path="/about"/>
          </div>

        </Router>
      </header>
    </div>
  );
}

export default App;
