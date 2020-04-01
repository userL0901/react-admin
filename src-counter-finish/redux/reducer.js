/*
* reducer函数模块
* 根据当前的state和指定action返回一个新的state
* */
// 管理count状态数据的reducer
import {INCREMENT, DECREMENT} from './action-types'
import {combineReducers} from 'redux'
function count(state=1, action) {
    switch (action.type){
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}
const initUser = {};
// 管理user状态数据的reducer
function user(state = initUser, action) {
    switch (action.type){
        default:
            return state
    }
}
// combineReducers 接收包含所有reducer函数的对象，返回一个新的reducer函数（总reducer）
//总的reducer函数管理的state的结构必然是对象
export default combineReducers({
    count: count,
    user
})