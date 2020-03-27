import React, {PureComponent} from 'react';
import {Form, Input, Tree} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'
const { TreeNode } = Tree;

const Item = Form.Item;
class AuthForm extends PureComponent {
    static propTypes = {
        role: PropTypes.object
    }
    constructor(props){
        super(props)
        //初始状态
        const {menus} = this.props.role;
        this.state ={
            checkedKeys: menus
        }
    }
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children): ''}
                </TreeNode>
            )
            return pre
        }, [])
    }
    onCheck = (checkedKeys) =>{
        this.setState({checkedKeys})
    }
    getMenus = () =>{
       return this.state.checkedKeys;
    }
    componentWillMount(){
        this.treeNodes = this.getTreeNodes(menuList)
    }
    //组件接收到新的属性调用
    //根据新传来的role来更新checkedKeys
    componentWillReceiveProps(nextProps){
        this.setState({checkedKeys: nextProps.role.menus})
    }
    render() {
        const {role} = this.props;
        const {checkedKeys} = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        };
        return (
            <div>
                <Item label="角色名称" {...formItemLayout}>
                    <Input value={role.name} disabled/>
                </Item>
                <Tree
                    checkable
                    checkedKeys={checkedKeys}
                    defaultExpandAll={true}
                    onCheck={this.onCheck}
                    // onSelect={onSelect}
                    // onCheck={onCheck}
                    // treeData={menuList}
                >
                    <TreeNode title="平台权限">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}

export default AuthForm