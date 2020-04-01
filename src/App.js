import React,{Component} from 'react';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>  {/*只匹配其中一个*/}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
export default App;