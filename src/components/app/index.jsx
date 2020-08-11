import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.scss';
import Home from "../home";
import Game from "../game";
import { connect } from 'react-redux';

function App() {
    return (
        <div className="container">
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/:gameId" component={Game} />
            </Router>
        </div>
    );
}

export default connect(null, null)(App);
