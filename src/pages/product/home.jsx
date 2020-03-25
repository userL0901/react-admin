import React, {Component} from 'react';
import {Card, Select, Button, Input, Icon, Table, Message} from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, requpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
const Option = Select.Option;

class ProductHome extends Component {
    state = {
        total: 0,
        products: [],
        loading: false,
        searchName: '', //搜索的关键字
        searchType: 'productName' //搜索的类型
    };

    initColumns = () =>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                width: 200,
                // dataIndex: 'status',
                render: (product) => {
                    const {_id, status} = product;
                    return(
                        <span>
                            <Button type="primary"
                                    onClick={()=>{this.updateStatus(_id, status ===1 ? 2 : 1)}}>
                                {status === 2 ? '上架' : '下架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 200,
                render: (product) =>{
                    return(
                        <span>
                            {/*将product传递给目标组件*/}
                            <LinkButton onClick={() => {this.props.history.push('/product/detail', product)}}>详情</LinkButton>
                            <LinkButton onClick={() => {this.props.history.push('/product/addupdate', product)}}>修改</LinkButton>
                        </span>
                    )
                }
            }
        ];
    };
    //更新指定商品的状态
    updateStatus =async(_id, status) =>{
        const res = await requpdateStatus(_id, status);
        if(res.status === 0){
            Message.success('更新商品成功');
            this.getProducts(this.pageNum)
        }
    };
    getProducts = async (pageNum) =>{
        this.pageNum = pageNum;
        this.setState({loading: true});
        const {searchName, searchType} = this.state;
        let result;
        if(searchName){
            result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType});
        }else{
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        this.setState({loading: false});
        if(result.status === 0){
            const {total, list} = result.data;
            this.setState({
                total,
                products: list
            })
        }
    };
    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        this.getProducts(1);
    }
    render() {
        const {products, total, loading, searchName, searchType} = this.state;
        const title =(
            <span>
                <Select value={searchType} style={{width: 150}} onChange= {value => this.setState({searchType: value})}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字"
                       style={{width: 150,margin: '0 15px'}}
                       value={searchName}
                       onChange= {event => this.setState({searchName: event.target.value})}/>
                <Button type="primary" onClick={()=>{this.getProducts('1')}}>查询</Button>
            </span>
        );
        const extra =(
            <Button type="primary" onClick={()=>{this.props.history.push('/product/addupdate')}}>
                <Icon type="plus"/>
                添加商品
            </Button>
        );
        return (
            <Card title={title} extra ={extra}>
                <Table
                    rowKey= '_id'
                    bordered
                    loading = {loading}
                    dataSource= {products}
                    columns = {this.columns}
                    pagination={{total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}

export default ProductHome