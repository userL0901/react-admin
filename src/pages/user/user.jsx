import React, {Component} from 'react';
import {Card,Button,Table,Modal,message} from 'antd'
import {timeFormater} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import {reqUser, reqDeleteUser, reqAddOrUpdateUser} from '../../api'
import UserForm from './user-form'

class User extends Component {
    state ={
        users: [],
        roles: [],
        isShow: false
    }
    initColumns = () =>{
        this.columns = [
            {
                title: '用户名称',
                dataIndex: 'username', // 显示数据对应的属性名
            },
            {
                title: '邮箱',
                dataIndex: 'email', // 显示数据对应的属性名
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: timeFormater
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user)=> (<span>
                    <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                    <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                </span>)

            }
        ]
    }
    initRoleNames = (roles)=>{
        const roleNames = roles.reduce((pre, role) =>{
            pre[role._id] = role.name;
            return pre
        },{})
        this.roleNames = roleNames
    }
    deleteUser = (user) =>{
        Modal.confirm({
            title: `确认删除${user.username}吗？`,
            onOk:async() => {
                const res = await reqDeleteUser(user._id)
                if(res.status===0){
                    message.success('删除用户成功')
                    this.getUsers()
                }else{
                    message.success('删除用户失败')
                }
            },
            onCancel() {},
        });
    }
    showUpdate = (user) =>{
        this.user = user;
        this.setState({isShow: true})
    }
    getUsers = async() =>{
        const res = await reqUser();
        if(res.status===0){
            const {users, roles} = res.data;
            this.initRoleNames(roles);
            this.setState({
                users, roles
            })
        }
    }
    addUpdataUser = () =>{
        const user = this.form.getFieldsValue();
        this.form.validateFields(async(err,value)=>{
            if(!err){
                this.setState({isShow: false})
                this.form.resetFields();
                if(this.user){
                    user._id = this.user._id
                }
                const res = await reqAddOrUpdateUser(user);
                if(res.status===0){
                    message.success(`${this.user ? '修改': '添加'}用户成功`);
                    this.getUsers();
                }else{
                    message.success(`${this.user ? '修改': '添加'}用户失败`);
                }
            }
        })
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getUsers()
    }
    render() {
        const {users, roles, isShow} = this.state;
        const user = this.user || {};
        const title = (
            <Button type="primary" onClick={()=>{
                this.setState({isShow: true})
                // this.form.resetFields()
                this.user = null
            }}>创建用户</Button>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                />
                <Modal
                    title={user._id ? '修改用户': '添加用户'}
                    visible={isShow}
                    onOk={this.addUpdataUser}
                    onCancel={()=>{
                        this.setState({isShow: false})
                        this.form.resetFields()
                    }}
                >
                    <UserForm setForm={(form) => this.form = form} roles={roles} user={user}/>
                </Modal>
            </Card>
        )
    }
}

export default User