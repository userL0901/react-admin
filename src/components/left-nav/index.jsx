import React, {Component} from 'react';
import './index.less'
import logo from '../../assets/image/login.jpg'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'
const {SubMenu} = Menu;

class LeftNav extends Component {
    //根据menu的数据数组生成对应的标签数组(map方法1)
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}><Icon type={item.icon}/><span>{item.title}</span></Link>
                    </Menu.Item>
                )
            } else{
                return (
                    <SubMenu
                        key={item.key}
                        title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    //reduce()(reduce方法2)
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item)=>{
            //向pre中添加<Menu.item>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}><Icon type={item.icon}/><span>{item.title}</span></Link>
                    </Menu.Item>
                ))
            }else{
                //查找某个路由的子item
                const cItem = item.children.find(cItem => cItem.key === path);
                if(cItem){
                    this.openKey = item.key;
                }
                //添加<SubMenu>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    };
    // 在第一次render之前执行（同步的）
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList);
    }
    render() {
        //获取当前的路由路径
        const path = this.props.location.pathname;
        //得到需要打开菜单的key
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>React后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
//withRouter高阶组件
//包装非路由组件，返回新组件
//新组件向非路由组件传递3个属性：history/location/match，
export default withRouter(LeftNav);