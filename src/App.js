import logo from './logo.svg';
import './App.css';
import Test from './components/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Practice from './components/Practice';
import Characters from './components/Characters';
import Typer from './components/Typer';
import About from './components/About';


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
            <Route path="/practice" component={Practice}/>
            <Route path="/test" component={Test}/>
            <Route path="/typer" component={Typer}/>
            <Route path="/characters" component={Characters}/>
            <Route path="/about" component={About}/>
          </div>

        </Router>
      </header>
    </div>
  );
}

export default App;
