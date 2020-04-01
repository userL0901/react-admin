import React,{Component} from 'react';

class App extends Component {
    state = {
        count: 0
    }
    constructor(props){
        super(props)
        this.numberRef = React.createRef()
    }
    increment = ()=>{
        const number = this.numberRef.current.value * 1
        this.setState(state =>({count: state.count + number}))
    }
    decrement = () =>{
        const number = this.numberRef.current.value * 1
        this.setState(state =>({count: state.count - number}))
    }
    incrementIfOdd = () =>{
        const number = this.numberRef.current.value * 1
        if(this.state.count % 2 === 1){
            this.setState(state =>({count: state.count + number}))
        }
    }
    asyncAdd = () =>{
        const number = this.numberRef.current.value * 1
        setTimeout(()=>{
            this.setState(state =>({count: state.count + number}))
        },1000)
    }
    render() {
        const count = this.state.count;
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