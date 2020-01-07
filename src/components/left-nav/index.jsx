import React, {Component} from 'react';
import './index.less'
import logo from '../../assets/image/login.jpg'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'
const {SubMenu} = Menu;

class LeftNav extends Component {
    //根据menu的数据数组生成对应的标签数组
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return (
                <Menu.Item key="home">
                    <Link to="/home"><Icon type="home"/><span>首页</span></Link>
                </Menu.Item>
                    // <Menu.Item key={item.key}>
                    //     <Link to={item.key}><Icon type={item.icon}/><span>{item.title}</span></Link>
                    // </Menu.Item>
                )
            }
            // else{
            //     return (
            //         <SubMenu
            //             key={item.key}
            //             title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            //             {this.getMenuNodes(item.children)}
            //         </SubMenu>
            //     )
            // }
        })
    }
    render() {
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>React后台</h1>
                </Link>
                {this.getMenuNodes(menuList)}
               {/* <Menu
             defaultSelectedKeys={['home']}
             defaultOpenKeys={['sub2']}
             mode="inline"
             theme="dark"
             >
             <Menu.Item key="home">
             <Link to="/home"><Icon type="home"/><span>首页</span></Link>
             </Menu.Item>
             <SubMenu
             key="sub2"
             title={<span><Icon type="appstore"/><span>商品</span></span>}>
             <Menu.Item key="/category">
             <Link to="/category">
             <Icon type="appstore"/>
             <span>品类管理</span>
             </Link>
             </Menu.Item>
             <Menu.Item key="/product">
             <Link to="/product">
             <Icon type="appstore"/>
             <span>商品管理</span>
             </Link>
             </Menu.Item>
             </SubMenu>
             </Menu>*/}
            </div>
        )
    }
}

export default LeftNav;