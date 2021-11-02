import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Nav from './components/Nav';
import Footer from './components/Footer';


function App() {
    return (
          <Router>
              <Nav />
              <Switch>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/">
                        <Products />
                    </Route>
              </Switch>
              <Footer />
          </Router>
    );
}

export default App;