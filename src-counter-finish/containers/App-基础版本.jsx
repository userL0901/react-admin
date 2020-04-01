import React,{Component} from 'react';
import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {increment, decrement} from '../redux/actions'
// 将redux管理的state数据映射成ui组件的一般属性
function mapStateToProps(state) {
    return {
        count: state
    }
}
// 将包含dispatch代码的函数据映射成ui组件的函数属性
function mapDispathToProps(dispatch) {
    return {
        increment: (number) => dispatchh(increment(number)),
        decrement: (number) => dispatch(decrement(number))
    }
}
export default connect(
    mapStateToProps, //指定一般属性
    mapDispathToProps   //指定函数属性
)(Counter)
/*
*容器组件：通过connect包装UI组件产生组件
* */