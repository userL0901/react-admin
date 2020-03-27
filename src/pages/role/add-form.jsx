import React, {Component} from 'react';
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired, //用来传递form对象的函数
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Form>
                    <Item label="角色名称" {...formItemLayout}>
                        {getFieldDecorator('roleName',{
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入角色名称'
                                }
                            ]
                        })(
                            <Input placeholder="请输入角色名称"/>
                        )}
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddForm)