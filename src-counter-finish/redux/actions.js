/*
* 包含n个以用来创建action的工厂函数Action creators
* */
import {INCREMENT, DECREMENT} from './action-types'
 //增加/减少的同步action，返回对象
export const increment = number =>({type: INCREMENT,data: number})
export const decrement = number =>({type: DECREMENT,data: number})
//增加/减少的异步action ,返回函数
export const incrementAsync = number => {
    return dispatch =>{
        // 执行异步（计数器，ajax请求，promise）
        setTimeout(()=>{
            dispatch(increment(number))
        },1000)
    }
}
