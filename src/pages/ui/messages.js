import React from 'react'
import {Card, Button, message,} from 'antd'
import './ui.less'

const ButtonGroup = Button.Group;
const key = 'updatable'

export default class Messages extends React.Component {
     state = {
         iconLoading: true
     }
     openMessage = ()=> {
        message.info('This is a normal message');
     }
     openMes = (type)=> {
        message[type](`This is a message of ${type}`);
     }
     openMessageLoad = () => {
         message.loading('Action in progress..', 2.5)
             .then(() => message.warning('Loading finished', 2.5))
             .then(() => message.info('Loading finished is finished', 2.5))
     }
    render() {
        return (
             <div>
                 <Card title='信息提醒框'>
                     <Button type="primary" onClick={this.openMessage}>normal</Button>
                     <Button type="primary" onClick={this.openMessageLoad}>loadingyan</Button>
                     <Button type="primary" onClick={()=> this.openMes('success')}>success</Button>
                     <Button type="primary" onClick={()=> this.openMes('info')}>info</Button>
                     <Button type="primary" onClick={()=> this.openMes('warning')}>warning</Button>
                     <Button type="primary" onClick={()=> this.openMes('error')}>error</Button>

                 </Card>
             </div>
        )
    }
}
