import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
class Product extends Component {
    render() {
        return (
            <Switch>
                {/*exact路径完全匹配*/}
                <Route path="/product" component={ProductHome} exact/>
                <Route path="/product/detail" component={ProductDetail}/>
                <Route path="/product/addupdate" component={ProductAddUpdate}/>
                <Redirect to="/product"/>
            </Switch>
        )
    }
}

export default Product