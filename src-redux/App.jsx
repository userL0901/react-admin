import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {increment, decrement} from './redux/actions'
class App extends Component {
    // state = {
    //     count: 0
    // }
    static propTypes = {
        store: PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.numberRef = React.createRef()
    }
    increment = ()=>{
        const number = this.numberRef.current.value * 1
        this.props.store.dispatch(increment(number))
    }
    decrement = () =>{
        const number = this.numberRef.current.value * 1
        this.props.store.dispatch(decrement(number))
    }
    incrementIfOdd = () =>{
        const number = this.numberRef.current.value * 1
        if(this.props.store.getState() % 2 === 1){
            this.props.store.dispatch(increment(number))
        }
    }
    asyncAdd = () =>{
        const number = this.numberRef.current.value * 1
        setTimeout(()=>{
            this.props.store.dispatch(increment(number))
        },1000)
    }
    render() {
        const count = this.props.store.getState();
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
export default App;