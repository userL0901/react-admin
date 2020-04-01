import React,{Component} from 'react';
import PropTypes from 'prop-types'
/*
* UI组件
* 代码中没有reedux相关的代码
* */
class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
    }
    constructor(props){
        super(props)
        this.numberRef = React.createRef()
    }
    increment = ()=>{
        const number = this.numberRef.current.value * 1
        this.props.increment(number)
    }
    decrement = () =>{
        const number = this.numberRef.current.value * 1
        this.props.decrement(number)
    }
    incrementIfOdd = () =>{
        const number = this.numberRef.current.value * 1
        if(this.props.count % 2 === 1){
            this.props.increment(number)
        }
    }
    // asyncAdd = () =>{
    //     const number = this.numberRef.current.value * 1
    //     setTimeout(()=>{
    //         this.props.increment(number)
    //     },1000)
    // }
    asyncAdd = () =>{
        const number = this.numberRef.current.value * 1
        this.props.incrementAsync(number)
    }
    render() {
        const count = this.props.count;
        return (
            <div>
                <p>CLICK {count}</p>
                <div>
                    <select ref={this.numberRef}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;
                    <button onClick={this.incrementIfOdd}>基数增加</button>&nbsp;
                    <button onClick={this.asyncAdd}>异步增加1s之后</button>
                </div>
            </div>
        )
    }
}
export default Counter;