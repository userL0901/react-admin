import React, {Component} from 'react';
import './index.less'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';
import LinkButton from '../link-button';
import { timeFormater } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWethere} from '../../api'
import menuList from '../../config/menuConfig'

class Header extends Component {

    state = {
        currentTime: timeFormater(Date.now()),
        dayPictureUrl: '',
        weather: ''
    };
    getTime = () =>{
        this.intervalId = setInterval(()=>{
            const currentTime = timeFormater(Date.now());
            this.setState({currentTime})
        },1000)
    };
    getWether = async () =>{
        const {dayPictureUrl, weather} = await reqWethere('101010100');
        this.setState({dayPictureUrl, weather})
    };
    getTitle = () =>{
        //当前请求路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item=>{
            if(item.key === path){
                title = item.title
            }else if(item.children){
               const cItem =  item.children.find(cItem => cItem.key === path);
                if(cItem){
                   title = cItem.title
                }
            }
        });
        return title
    };
    loginOut = () =>{
        Modal.confirm({
            content: '确定退出吗？',
            onOk: () => {
                storageUtils.remover();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            }
        })
    };
    componentDidMount(){
        this.getTime();
        //获取天气
        this.getWether();
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime,dayPictureUrl,weather} = this.state;
        const user = memoryUtils.user;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{user.username || 'Admin'}</span>
                    <LinkButton onClick={this.loginOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl || ''} alt=""/>
                        <span>{weather || '晴'}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)