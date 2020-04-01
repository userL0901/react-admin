import React, {Component} from 'react';
import './login.less';
import {Redirect} from 'react-router-dom'
import loginImg from '../../assets/image/login.jpg'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
// import {reqLogin} from '../../api'
// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();//阻止事件默认提交（不会提交表单了）
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 请求登录
                const {username, password} = values;
                this.props.login(username, password)
                //const response = await reqLogin(username, password);
                /*if(response.status === 0){
                    message.success('登录成功');
                    //push可以回退
                    // replace不可以回退
                    const user = response.data;
                    memoryUtils.user = user;
                    storageUtils.saveUser(user);
                    this.props.history.replace('/home');
                }else{
                    message.error(response.msg)
                }*/
            } else {
                console.log('校验失败');
            }
        });
    };
    validatePwd = (rule, value, callback) => {
        if (!value) {
            callback('密码不能为空');
        } else if (value.length < 4) {
            callback('密码长度不能小于4位');
        } else if (value.length > 12) {
            callback('密码长度不能大于12位');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('用户名必须是英文、数字下划线的组合');
        } else {
            callback()
        }
    };

    render() {
        //判断用户是否登录，防止在url里面输入login返回登录页面
        // const user = memoryUtils.user;
        const user = this.props.user;
        if(user && user._id){
            return <Redirect to='/home'/>
        }
        // const errMsg = this.props.user.errorMsg //获取错误的信息
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={loginImg} alt=""/>
                    <h1>React 后台管理系统</h1>
                </header>
                <section className="login-content">
                    {/*<div>{errMsg}</div>*/}
                    <h2>用户登录</h2>
                    <div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    initialValue: 'admin',
                                    validateFirst: true,
                                    whitespace: true,
                                    rules: [
                                        {required: true, whitespace: false, message: '请输入用户名'},
                                        {min: 4, message: '用户名至少4位'},
                                        {max: 12, message: '用户名最多12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字的组合'}
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    initialValue: 'admin',
                                    rules: [{validator: this.validatePwd}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                {/*<a className="login-form-forgot" href="">*/}
                                {/*Forgot password*/}
                                {/*</a>*/}
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}
// 1.高阶函数 -->  create()
// 特点：
    // （1）接收函数类型的参数
    // （2）返回值是函数
        // eg：
        // (a)定时器：setInterval() ;setTimeout()'
        // (b)Promise(()=>{})then(value =>{} , reason=>())
        // (c)数组遍历相关方法： forEach()/filter()/map()/reduce()/find()
    // （3）高阶函数更新动态，更加具有扩展性
// 2.高阶组件
//    1）本质就是一个函数
//    2）接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定的属性
//    3）作用：扩展组件的功能
// 包装Form组件生成新的组件--> 新组件会向From组件传对象属性：form
const Wrap = Form.create()(Login);
export default connect(
    state => ({user: state.user}),
    {login}
)(Wrap)