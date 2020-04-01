import ajax from './request'
// import jsonp from 'jsonp'
// import {message} from 'antd'

export const reqLogin = (username,password) => ajax('/login',{username, password}, 'POST');
// 品类管理
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId: parentId});
export const reqDelCategorys = (_id) => ajax('/manage/category/delete',{_id: _id}, 'POST');
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId}, 'POST');
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update',{categoryId, categoryName}, 'POST');
//商品管理
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list',{pageNum, pageSize});
// List查询searchType: productName, productDesc
export const reqSearchProducts = ({pageNum, pageSize,searchName,searchType}) => ajax('/manage/product/search',
    {pageNum, pageSize,[searchType]: searchName});
//获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info',{categoryId});
//更新商品上架、下架
export const requpdateStatus = (productId, status) => ajax('/manage/product/updateStatus',{productId, status}, 'POST');
//图片的删除
export const reqDeleteImg = (name) => ajax('/manage/img/delete',{name}, 'POST');
//添加/更新 商品
export const reqAddUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update': 'add') ,product, 'POST');
//获取所有角色的列表
export const reqRoles = () => ajax('manage/role/list');
// 添加角色
export const reqAddRoles = (roleName) => ajax('manage/role/add', {roleName}, 'POST');
//更新角色
export const reqUpdateRoles = (role) => ajax('manage/role/update', role, 'POST');
//获取所有用户列表
export const reqUser = () =>ajax('manage/user/list');
//删除用户
export const reqDeleteUser  =(userId) =>ajax('manage/user/delete',{userId}, 'POST');
//添加用户
export const reqAddOrUpdateUser  =(user) =>ajax('manage/user/'+ (user._id ? 'update' : 'add'),user, 'POST');

export const reqWethere = (city) =>{
    return new Promise((reslove,reject)=>{
        // const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=LEdp28xQHy3NGPdQsGapML4EKLmtpeHC`;
        // const url = `http://t.weather.sojson.com/api/weather/city/${city}`;
        // jsonp(url,{},(err, data)=>{
        //     // if(!err && data.status === 'success'){
        //     //     const {dayPictureUrl,weather} = data.results[0].weather_data[0];
        //     //     reslove({dayPictureUrl,weather})
        //     // }else{
        //     //     message.error('获取天气失败')
        //     // }
        //     if(!err && data.status === '200'){
        //         const {dayPictureUrl,weather} = data.results[0].weather_data[0];
        //         reslove({dayPictureUrl,weather})
        //     }else{
        //         message.error('获取天气失败')
        //     }
        // })
    })
};
