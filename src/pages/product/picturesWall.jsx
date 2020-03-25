import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message, Icon } from 'antd';
import { reqDeleteImg } from '../../api';
import {BASE_IMG_URL} from '../../utils/constants'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    static propTypes = {
        imgs: PropTypes.array
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    constructor (props){
        super(props);
        let fileList = [];
        const {imgs} = this.props;
        if(imgs && imgs.length>0){
            fileList = imgs.map((img, index) =>({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL + img
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    // file 当前操作图片文件
    handleChange = async({ file, fileList }) => {
        //一旦上传成功，将当前上传的file的信息修正（name,file）
        if(file.status === 'done'){
            const result = file.response;
            if(result.status === 0){
                message.success('上传图片成功');
                const {name ,url }= result.data;
                file = fileList[fileList.length-1];
                file.name = name;
                file.url = url;

            }else{
                message.success('上传图片失败')
            }
        }else if(file.status === 'removed'){
            const res = await reqDeleteImg(file.name);
            if(res.status === 0){
                message.success('删除图片成功')
            }else{
                message.success('删除图片失败')
            }
        }
        this.setState({ fileList })
    };
    //获取所有已上传的图片文件名的数组
    getImgs = () =>{
        return this.state.fileList.map(file => file.name)
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload"  //接口地址
                    listType="picture-card"
                    accept="image/*" //只接受图片格式
                    name="image" //发到后台的文件参数名
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
