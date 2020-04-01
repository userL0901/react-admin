import React from 'react';
import ReactDom from 'react-dom';
import App from './App'
import store from './redux/store'
ReactDom.render(<App store={store}/>,document.getElementById('root'));

//给 store绑定更新的监听
store.subscribe(()=>{
    ReactDom.render(<App store={store}/>,document.getElementById('root'));
})