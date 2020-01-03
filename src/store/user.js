import {SET_NAME,SET_AGE} from './action'

//1. 创建一个存储
function reducer1(state={name:"g",age: 14}, action) {
    switch (action.type){
        case SET_NAME:
            return {
                ...state,
                name: action.name
            };
        case SET_AGE:
            return {
                ...state,
                age: state.age+action.age
            };
        default:{
            return state
        }
    }
}
export default reducer1
