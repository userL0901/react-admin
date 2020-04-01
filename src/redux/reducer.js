// 用来根据老的state和指定的action返回行的state函数
//用来管理头部标题的reducer
import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'
import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROE_MSG, RESET_USER} from './action-types'
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
    switch (action.type){
        case SET_HEAD_TITLE:
            return action.data
        default :
            return state
    }
}
//用来管理当前登录用户的reducer
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
    switch (action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROE_MSG:
            const errorMsg = action.errorMsg
            //state.errorMsg = errorMsg //不要直接修改
            return {...state, errorMsg}
        case RESET_USER:
            return {}
        default :
            return state
    }
}
export default combineReducers ({
    headTitle,
    user
})