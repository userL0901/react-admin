import axios from 'axios'
import {message} from 'antd';
// 发送ajax异步的请求模块
// 封装axios;
// 函数返回值是Promise
export default function ajax(url,data ={},type='GET') {
    return new Promise((resolve, reject)=>{
        let promise;
        if(type === 'GET'){
            promise = axios.get(url,{params: data})
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response =>{
            resolve(response.data)
        }).catch(err=>{
            message.error('请求错误：'+ err.message)
        })
    })
}
