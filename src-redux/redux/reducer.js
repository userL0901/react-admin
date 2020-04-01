/*
* reducer函数模块
* 根据当前的state和指定action返回一个新的state
* */
// 管理count状态数据的reducer
import {INCREMENT, DECREMENT} from './action-types'

export default function count(state=1, action) {
    switch (action.type){
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}
