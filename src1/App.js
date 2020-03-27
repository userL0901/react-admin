import React from 'react';
import './App.css';
import New1 from './components/New1.js'
import New2 from './components/New2.js'
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Link to="/">首页</Link>
                    <Link to="/news/1">新闻1</Link>
                    <Link to="/news/2">新闻2</Link>
                    <Route path="/" exact component={New1}/>
                    <Route path="/news/:id" component={New2}/>
                </div>
            </Router>
        )
    }
}

export default connect(function (state,props) {
     return state
})(App);
