import React, {Component} from 'react';
import './login.less';
import {Redirect} from 'react-router-dom'
import login from '../../assets/image/login.jpg'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 请求登录
                const {username, password} = values;
                const response = await reqLogin(username, password);
                console.log('成功', response);
                if(response.status === 0){
                    message.success('登录成功');
                    //push可以回退
                    // replace不可以回退
                    const user = response.data;
                    memoryUtils.user = user;
                    storageUtils.saveUser(user);
                    this.props.history.replace('/');
                }else{
                    message.error(response.msg)
                }
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
        //判断用户是否登录
        const user = memoryUtils.user;
        if(user && user.user_id){
            return <Redirect to='/'/>
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={login} alt=""/>
                    <h1>React 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    initialValue: 'admin',
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
                                    initialValue: '123456',
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
const Wrap = Form.create()(Login);
export default Wrap