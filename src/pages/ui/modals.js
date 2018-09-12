import React from 'react'
import {Card, Button, Modal} from 'antd'
import './ui.less'
export default class Modals extends React.Component {
     state = {
         loading: false,
         iconLoading: false,
         value: 1,
         showModal1:false,
         showModal2:false,
         showModal3:false,
         showModal4:false,

     }
    handleOpen = (type) =>{
         this.setState({
            [type]: true
        })
    }
    success = ()=> {
      Modal.success({
        title: 'This is a success message',
        content: 'some messages...some messages...',
      });
    }

    render() {
        return (
             <div>
                 <Card title='基础按钮'>
                    <Button.Group>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal1')}>模态1</Button>
                        <Button type="primary" onClick={this.success}>模态2</Button>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal3')}>模态3</Button>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal4')}>模态4</Button>
                     </Button.Group>
                 </Card><Card title='基础按钮'>
                    <Button.Group>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal1')}>模态1</Button>
                        <Button type="primary" onClick={this.success}>模态2</Button>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal3')}>模态3</Button>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal4')}>模态4</Button>
                     </Button.Group>
                 </Card><Card title='基础按钮'>
                    <Button.Group>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal1')}>模态1</Button>
                        <Button type="primary" onClick={this.success}>模态2</Button>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal3')}>模态3</Button>
                        <Button type="primary" onClick={()=> this.handleOpen('showModal4')}>模态4</Button>
                     </Button.Group>
                 </Card>

                 <Modal
                    title='react'
                    cancelText='取消'
                        visible={this.state.showModal1}
                    onCancel={()=>{this.setState({
                        showModal1: false
                    })}}
                 >
                    <p>Some contents... Some contents...</p>
                 </Modal>
             </div>
        )
    }
}
