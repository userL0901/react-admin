// 包含m个action creator函数的模块
// 同步action： 对象{type: 'xxx',data: '数据'}
// 异步action： 函数 dispatch => {}
import { SET_HEAD_TITLE } from './action-types'
export const setHeadTitle = (headTile) => ({type: SET_HEAD_TITLE, data: headTile})
