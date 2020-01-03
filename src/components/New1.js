import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {SET_NAME,SET_AGE} from '../store/action'
class Cmp1 extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            user: []
        }
    }
    fn(){
        this.props.setName('zhangsan');
        this.props.addAge(2);
    }

    async componentDidMount(){
        // let res = await fetch('data/data.json');
        // let data = await res.json();
        // this.setState({
        //     user: data
        // })
        try{
            let {data} = await Axios.get('/data/data.json');
            this.setState({
                user: data
            })
        }catch(e){
            alert('刷新')
        }
    }
    render() {
        return (
            <div>
                <h2>组件1：{this.props.match.params.id}</h2>
                <ul>
                    {this.state.user.map((item,index)=>(
                        <li key={index}>{item.user},{item.password}</li>
                    ))}
                </ul>
                <input type="button" value='改名' onClick={this.fn.bind(this)}/>
                {this.props.name}
                {this.props.age}
            </div>
        )
    }
}
export default connect(function(state,props){
    return state.user
},{
    setName(name){
        return{
            type: SET_NAME,
            name
        }
    },
    addAge(age){
        return {
            type: SET_AGE,
            age
        }
    }
})(Cmp1);