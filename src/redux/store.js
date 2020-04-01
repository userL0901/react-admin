// 管理对象store, 向外默认暴露store
import {createStore, applyMiddleware} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducer'
export default createStore(reducer, applyMiddleware(thunk))
// export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
