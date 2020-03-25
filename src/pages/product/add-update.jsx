import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Button, Icon } from 'antd'
// import linkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
import PicturesWall from './picturesWall'
import richTextEditor from './rich-text-editor'
const { Item } = Form;
const { TextArea } = Input;
class ProductAddUpdate extends Component {
    state = {
        options: [],
    }

    constructor (props){
        super(props);
        //用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
    }
    submit = ()=>{
        this.props.form.validateFields((err, value)=>{
            if(!err){
                const imgs = this.pw.current.getImgs();
                console.log(imgs,'img');
            }
        })
    };
    // 获取一级、二级列表并显示
    getCategorys = async(parentId) =>{
      const res = await reqCategorys(parentId);
      if(res.status===0){
          const categorys = res.data;
          if(parentId === '0'){
              this.initOptions(categorys);
          }else{
              return categorys //返回二级列表==》当前async函数返回的promise 就会成功且value=categorys
          }
      }
    };
    initOptions = async(categorys) =>{
        //根据categorys数据生成option数组
        const option = categorys.map(c=>({
            value: c._id,
            label: c.name,
            isLeaf: false
        }));
        //如果是一个二级分类商品的更新
        const {isUpdate, product} = this;
        const {pCategoryId} = product;
        if(isUpdate && pCategoryId !== '0'){
            //获取对应的二级分类
            const subCategorys = await this.getCategorys(pCategoryId);
            //生成二级下拉列表的option
            const childOptions = subCategorys.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true
            }));
            // 找到对应的一级option上
            const targetOption = option.find(option =>option.value === pCategoryId);
            targetOption.children = childOptions;
        }
        // 更新option
        this.setState({options: [...option]})
    };
    validatePrice = (rule, value, callback) =>{
        if(value * 1<0){
            callback('价格必须大于0')
        }
        callback();
    };
    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        // 根据选中的分类，请求获取下二级分类列表
        const subCategory = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        if(subCategory && subCategory.length >0){
            //生成二级列表
           const childOptions = subCategory.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true
            }));
           // 关联
            targetOption.children = childOptions;
        }else{
            targetOption.isLeaf = true;
        }
    };
    componentDidMount(){
        this.getCategorys('0')
    }
    componentWillMount(){
        //取出携带的state
        const product = this.props.location.state;
        this.isUpdate = !!product;
        //保存商品，如果没有，保存是{}
        this.product = product || {};
    }
    render() {
        const {isUpdate, product } = this;
        const {pCategoryId, categoryId, imgs} = product;
        //用来接收级联分类ID的数组
        const categoryIds = [];
        if(isUpdate){
            if(pCategoryId === '0'){
                categoryIds.push(categoryId)
            }
            categoryIds.push(pCategoryId);
            categoryIds.push(categoryId)
        }
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        const title = (
            <span>
                <link-button>
                    <Icon type="arrow-left" style={{fontSize: 18,marginRight: 10,color: 'green'}} onClick={()=>{this.props.history.goBack()}}/>
                </link-button>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        );
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name',{
                                initialValue: product.name,
                                rules: [
                                    {required: true, message: '请输入商品名称'}
                                ]
                            })(<Input type="text" placeholder="请输入商品名称"/>)
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc',{
                                initialValue: product.desc,
                                rules: [
                                    {required: true, message: '请输入商品描述'}
                                ]
                            })(<TextArea placeholder="请输入商品描述" allowClear autoSize={{ minRows: 2, maxRows: 5 }}/>)
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price',{
                                initialValue: product.price,
                                rules: [
                                    {required: true, message: '请输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type="number" placeholder="请输入商品价格" addonAfter="元"/>)
                        }
                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator('categoryIds',{
                                initialValue: categoryIds,
                                rules: [
                                    {required: true, message: '请选择商品分类'}
                                ]
                            })(<Cascader
                                placeholder="请选择商品分类"
                                options={this.state.options}//列表数组数据
                                loadData={this.loadData} //驾照下一个列表的监听回调
                                // onChange={this.onChange}
                                // changeOnSelect
                            />)
                        }
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pw} imgs={imgs}/>
                    </Item>
                    <Item label="商品详情" labelCol: {{span: 2 }} wrapperCol: {{ span: 20 }}>
                        <richTextEditor/>
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)

//1. 子组件调用父组件的方法:将父组件的方法以函数属性的形式传递给子组件， 子组件就可以调用
//2. 父组件调用子组件的方法:在父组件中通过ref得到子组件标签对象(也就是组件对斜)，调用其方法