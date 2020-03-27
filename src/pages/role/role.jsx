import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles, reqAddRoles, reqUpdateRoles} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {timeFormater} from '../../utils/dateUtils'
import AddForm from './add-form'
import AuthForm from './auth-form'
class Role extends Component {
    state = {
        roles: [],
        role: {}, //选中的role
        isShowAdd: false,
        isShowAuth: false,
        count:0
    }
    constructor(props){
        super(props)
        this.auth = React.createRef()
    }
    initColumns = () =>{
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '创建时间',
                dataIndex: 'create_time', // 显示数据对应的属性名
                render: timeFormater
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time', // 显示数据对应的属性名
                render:(auth_time)=>timeFormater(auth_time)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name', // 显示数据对应的属性名
            }
        ]
    }
    onRow = (role) =>{
        return {
            // 点击行
            onClick: event => {
                this.setState({role})
            }
        }
    }
    getRoles = async()=>{
        const res = await reqRoles();
        if(res.status===0){
            this.setState({
                roles: res.data
            })
        }
    }
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields();
        // 隐藏确认框
        this.setState({
            isShowAdd: false
        })
    };
    addRole = () => {
        this.form.validateFields(async(err, value)=>{
            if(!err){
                const {roleName} = value;
                this.form.resetFields();
                const res = await reqAddRoles(roleName);
                if(res.status ===0){
                    const role = res.data;
                    // const roles = [...this.state.roles];
                    // roles.push(role);
                    //推荐
                    this.setState((state, props)=>({
                        roles: [...state.roles, role],
                        isShowAdd: false
                    }))
                    message.success('添加角色成功');
                }else{
                    message.success('添加角色失败')
                }
            }
        })
    };
    updataRole = async() =>{
        const role = this.state.role
        const menus = this.auth.current.getMenus();
        role.menus = menus;
        role.auth_name = memoryUtils.user.username;
        role.auth_time = Date.now();
        const res = await reqUpdateRoles(role);
        if(res.status===0){

            //如果更新的是自己的角色强制退出
            if(role._id === memoryUtils.user.role._id){
                memoryUtils.user ={};
                storageUtils.remover()
                this.props.history.replace('/login')
                message.success('当前用户权限修改，请重新登录')
            }else{
                message.success('更新成功')
                this.setState({
                    roles: [...this.state.roles],
                    isShowAuth: false
                })
            }
        }else{
            message.error('更新失败')
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getRoles()
    }

    render() {
        const {roles, role, isShowAdd, isShowAuth} = this.state;
        const title = (
            <span>
                <Button type="primary" onClick={()=>this.setState({isShowAdd: true})}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={(!role._id)} onClick={()=>this.setState({isShowAuth: true})}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect:(role)=>{
                            this.setState({role})    
                        }
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updataRole}
                    onCancel={()=>{
                        this.setState({isShowAuth: false})
                    }}
                >
                    <AuthForm role={role} ref = {this.auth}/>
                </Modal>
            </Card>
        )
    }
}

export default Role