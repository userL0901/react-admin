import store from 'store'; //库
const USER_KEY = 'user_key';
export default {
    saveUser(user){
        //localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY, user)
    },
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        // store.get(USER_KEY || {})
    },
    remover(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }

}
