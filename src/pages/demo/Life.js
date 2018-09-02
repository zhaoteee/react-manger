import React from 'react'
import './life.less'

import {Button} from 'antd'
 
export default class Life extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    handleClick() {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return <div>
            <p>react lifecycle</p>
            <Button>按钮</Button>
            <button onClick={this.handleAdd}>点击一下1</button>
            <button onClick={this.handleClick.bind(this)}>点击一下</button>
            <p>{this.state.count}</p>
        </div>
    }
}