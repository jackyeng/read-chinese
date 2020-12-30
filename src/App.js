import './App.css';
import Test from './page/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './page/Navbar';
import Practice from './page/Practice';
import Characters from './page/Characters';
import Typer from './page/Typer';
import About from './page/About';


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
