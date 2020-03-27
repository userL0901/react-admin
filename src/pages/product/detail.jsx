import React, {Component} from 'react';
import './product.less'
import {Card, Icon, List} from 'antd';
import LinkButton from '../../components/link-button'
import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api'
const Item = List.Item;

class ProductDetail extends Component {
    state = {
        cName1: '',//一级分类名称
        cName2: '',//一级分类名称
    };
    async componentDidMount(){
        const {categoryId, pCategoryId} = this.props.location.state;
        if(pCategoryId === '0'){
            const res = await reqCategory(categoryId);
            const cName1 = res.data.name;
            this.setState({cName1});
        }else{
            /*
            通过多个await方式发送多个请求，后面的请求在前面一个完成之后才发送
            const res1 = await reqCategory(pCategoryId);
            const res2 = await reqCategory(categoryId);
            const cName1 = res1.data.name;
            const cName2 = res2.data.name;
            this.setState({cName1, cName2});
            */
            // 一次性发送多个请求
            const result = await Promise.all([reqCategory(categoryId), reqCategory(pCategoryId)]);
            const cName1 = result[0].data.name;
            const cName2 = result[1].data.name;
            this.setState({cName1, cName2});
        }
    }
    render() {
        //读取携带过来的state数据
        const product = this.props.location.state;
        const {cName1, cName2} = this.state;
        const title =(
            <span>
                <LinkButton>
                   <Icon type="arrow-left" style={{color: 'green',marginRight: 10,fontSize: 18}} onClick={()=>{this.props.history.goBack()}}/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述：</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格：</span>
                        <span>￥{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>{cName1} {cName2 ? '-->'+ cName2 : null}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        <span>
                            {
                                product.imgs.map(img=> <img src={BASE_IMG_URL+img} key={img} alt="" className="product-img"/>)
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: product.detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}

export default ProductDetail