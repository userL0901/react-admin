import ajax from './request'
import jsonp from 'jsonp'
import {message} from 'antd'
// export function reqLogin(username, password){
//     return ajax('/login',{username, password},'POST')
// }
export const reqLogin = (username,password) => ajax('/login',{username, password}, 'POST');

export const reqAddUser = (user) => ajax('/login',user, 'POST');
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId: parentId});
export const reqDelCategorys = (_id) => ajax('/manage/category/delete',{_id: _id}, 'POST');
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId}, 'POST');
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update',{categoryId, categoryName}, 'POST');

export const reqWethere = (city) =>{
    return new Promise((reslove,reject)=>{
        // const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=LEdp28xQHy3NGPdQsGapML4EKLmtpeHC`;
        const url = `http://t.weather.sojson.com/api/weather/city/${city}`;
        jsonp(url,{},(err, data)=>{
            // if(!err && data.status === 'success'){
            //     const {dayPictureUrl,weather} = data.results[0].weather_data[0];
            //     reslove({dayPictureUrl,weather})
            // }else{
            //     message.error('获取天气失败')
            // }
            console.log(data);
            if(!err && data.status === '200'){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                reslove({dayPictureUrl,weather})
            }else{
                message.error('获取天气失败')
            }

        })
    })
};
