import React from 'react'
import {Card, Button, Icon, Radio ,notification} from 'antd'
import './ui.less'

const ButtonGroup = Button.Group;
const key = 'updatable'

export default class Notification extends React.Component {
     state = {
         iconLoading: true
     }
    openNotification = ()=> {
         notification.open({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };
     openNotif = (type)=>{
         notification[type]({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
     }


     openNotifChange = ()=> {
         notification.config({
          placement: 'bottomLeft',
        });
         notification.open({
            key,
            message: 'Notification Title',
            description: 'description.',
          });
          setTimeout(() => {
            notification.open({
              key,
              message: 'New Title',
              description: 'New description.',
            });
          }, 1000);
     }
    render() {
        return (
             <div>
                 <Card title='通知提醒框'>
                     <Button type="primary" onClick={this.openNotification}>normal</Button>
                     <Button type="primary" onClick={()=> this.openNotif('success')}>success</Button>
                     <Button type="primary" onClick={()=> this.openNotif('info')}>info</Button>
                     <Button type="primary" onClick={()=> this.openNotif('warning')}>warning</Button>
                     <Button type="primary" onClick={()=> this.openNotif('error')}>error</Button>
                     <Button type="primary" onClick={this.openNotifChange}>change</Button>

                 </Card>
             </div>
        )
    }
}
