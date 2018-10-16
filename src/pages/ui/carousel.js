import React from 'react'
import {Card, Icon, Carousel } from 'antd'
import './ui.less'

export default class Messages extends React.Component {
     state = {
         mode: 'top',
     }
     onChange = (a, b, c)=> {
      console.log(a, b, c);
    }
    render() {
         const { mode } = this.state;
        return (
             <div>
                 <Card title='信息提醒框'>
                      <Carousel afterChange={this.onChange} autoplay>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                      </Carousel>
                 </Card>
                 <Card title='信息提醒框'>
                      <Carousel afterChange={this.onChange} autoplay effect="fade">
                        <div><h3><img src="http://cdn.jstar.com/upload/image/201808/1535688365V2wC.png" alt=""/></h3></div>
                        <div><h3><img src="http://cdn.jstar.com/upload/image/201808/1535595440kHdY.png" alt=""/></h3></div>
                        <div><h3><img src="http://cdn.jstar.com/upload/image/201807/1533029834oKGa.png" alt=""/></h3></div>
                        <div><h3><img src="http://cdn.jstar.com/upload/image/201804/1523426709Fyz5.png" alt=""/></h3></div>
                      </Carousel>
                 </Card>

             </div>
        )
    }
}
