import React, {PureComponent} from 'react';
import {Form, Input, Select} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
const Option = Select.Option;
class UserForm extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired, //用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {roles, user} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Form>
                    <Item label="用户名称" {...formItemLayout}>
                        {getFieldDecorator('username',{
                            initialValue: user.username,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名称'
                                }
                            ]
                        })(
                            <Input placeholder="请输入用户名称"/>
                        )}
                    </Item>
                    {user._id ? null : <Item label="密码" {...formItemLayout}>
                        {getFieldDecorator('password',{
                            initialValue: user.password,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]
                        })(
                            <Input placeholder="请输入密码" type="password"/>
                        )}
                    </Item>}
                    <Item label="手机号" {...formItemLayout}>
                        {getFieldDecorator('phone',{
                            initialValue: user.phone,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号'
                                }
                            ]
                        })(
                            <Input placeholder="请输入手机号"/>
                        )}
                    </Item>
                    <Item label="邮箱" {...formItemLayout}>
                        {getFieldDecorator('email',{
                            initialValue: user.email,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入邮箱'
                                }
                            ]
                        })(
                            <Input placeholder="请输入邮箱"/>
                        )}
                    </Item>
                    <Item label="角色" {...formItemLayout}>
                        {getFieldDecorator('role_id',{
                            initialValue: user.role_id,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择角色'
                                }
                            ]
                        })(
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(role=><Option value={role._id} key={role._id}>{role.name}</Option>)
                                }
                            </Select>
                        )}
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UserForm)