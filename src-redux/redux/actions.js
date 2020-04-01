/*
* 包含n个以用来创建action的工厂函数Action creators
* */
import {INCREMENT, DECREMENT} from './action-types'
 //增加的action
export const increment = number =>({type: INCREMENT,data: number})
export const decrement = number =>({type: DECREMENT,data: number})