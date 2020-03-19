import React, {Component} from 'react';
import memoryUtils from '../../utils/memoryUtils'
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'

const {Footer, Sider, Content} = Layout;

class Admin extends Component {
    render() {
        //判断是否登录
        const user = memoryUtils.user;
        //如果内存中没有 user
        if(!user || !user._id){
            //自动跳转
            return <Redirect to="/login"/>
        }
        return (
            <div style={{height: '100%'}}>
                <Layout style={{height: '100%'}}>
                    <Sider><LeftNav/></Sider>
                    <Layout>
                        <Header/>
                        <Content style={{margin: 20,background: '#fff'}}>
                            {/*Switch只匹配一个*/}
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center', color: '#afafaf'}}>推荐使用谷歌浏览器，可以获得的更佳的页面体验</Footer>
                    </Layout>
                </Layout>
            </div>

        )
    }
}

export default Admin