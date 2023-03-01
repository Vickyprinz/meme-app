import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import Meme from './Meme';
import Register from './Register'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const history = useHistory();
  
    const handleLogout = (e) => {
      e.preventDefault();
      setIsAuthenticated(false);
      history.push('/');
    };
    return (
        <div className="App">
          <Router>
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Switch>
              <Route path="/" exact>
                <Home setIsAuthenticated={setIsAuthenticated} />
              </Route>
              <Route path="/register">
                <Register setIsAuthenticated={setIsAuthenticated} />
              </Route>
              {isAuthenticated && (
                <Route path="/shelf">
                  <Meme />
                </Route>
              )}
            </Switch>
          </Router>
        </div>
      );
}  
export default App;
