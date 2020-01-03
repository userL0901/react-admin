import {createStore, combineReducers} from 'redux';
import user from '../store/user'
import company from '../store/company'
let reduces = combineReducers({
   user, company
});
// 2.创建存储对象
export default createStore(reduces);