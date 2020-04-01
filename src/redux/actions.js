// 包含m个action creator函数的模块
// 同步action： 对象{type: 'xxx',data: '数据'}
// 异步action： 函数 dispatch => {}
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROE_MSG, RESET_USER} from './action-types'
import {reqLogin} from '../api'
import {message} from 'antd'
import storageUtils from '../utils/storageUtils'
export const setHeadTitle = (headTile) => ({type: SET_HEAD_TITLE, data: headTile})
// 接受用户
export const receiveUser = (user) => ({type: RECEIVE_USER, user})
// 错误信息的action
export const show_error_msg = (errorMsg) => ({type: SHOW_ERROE_MSG, errorMsg})
// 退出登录
export const logout = () => {
    // 删除local中的user
    storageUtils.remover()
    // 返回action
    return {type: RESET_USER}
}

//登录的异步action
export const login = (username, password) =>{
    return async dispatch => {
        const res = await reqLogin(username, password)
        if(res.status === 0){
            const user = res.data;
            storageUtils.saveUser(user);
            dispatch(receiveUser(user))
        }else{
            const msg = res.msg;
            dispatch(show_error_msg(msg))
            message.error(res.msg)
        }
    }
}