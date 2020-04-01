import React, {Component} from 'react';
import {Row, Col, Button} from 'antd'
import {connect} from 'react-redux'
import './404.less'
import{setHeadTitle} from '../../redux/actions'
class notFound extends Component {
    goHome = ()=>{
       this.props.setHeadTitle('首页')
       this.props.history.replace('/home')
    }
    render() {
        return (
            <Row className="not-found">
                <Col span={12} className="left"></Col>
                <Col span={12} className="rights" style={{paddingLeft: 50,marginTop: 150}}>
                    <h1 style={{fontSize: 35}}>404</h1>
                    <h2>抱歉，你访问的页面不存在</h2>
                    <div>
                        <Button type="primary" onClick={this.goHome}>回到首页</Button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({}),
    {setHeadTitle}
)(notFound)