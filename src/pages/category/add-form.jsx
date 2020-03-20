import React, {Component} from 'react';
import {Form, Select, Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
const Option = Select.Option;
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired, //用来传递form对象的函数
        categorys: PropTypes.array.isRequired,//一级分类的数组
        parentId: PropTypes.string.isRequired  //父分类的id
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {categorys, parentId} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form>
                    <Item>
                        {getFieldDecorator('parentId',{
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)
                                }
                            </Select>
                            )}
                    </Item>
                    <Item>
                        {getFieldDecorator('categoryName',{
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入分类名称'
                                }
                            ]
                        })(
                            <Input placeholder="请输入分类名称"/>
                        )}
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddForm)