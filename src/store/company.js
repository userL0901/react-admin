import {SET_NAME,SET_AGE} from './action'

function reducer2(state={name:"gll",age: 25}, action) {
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
export default reducer2
