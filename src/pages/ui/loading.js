import React from 'react'
import {Card, Button, Modal, Spin, Icon, Alert} from 'antd'
import './ui.less'
export default class Loading extends React.Component {
     state = {
         loading: true,
         iconLoading: false,
         value: 1,
         showModal1:false,

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
         const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
         const container = (
              <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
              />
            );
        return (
             <div>
                 <Card title='loading组件'>
                     <Spin size="small" />
                     <Spin />
                     <Spin size="large" />
                 </Card>
                 <Card title='loading组件'>
                     <Spin indicator={antIcon} />
                 </Card>
                 <Card  title='loading组件'>
                     <Spin tip='加载中' spinning={this.state.loading} delay={500}>{container}</Spin>
                     <Spin indicator={antIcon}  spinning={this.state.loading} delay={500}>{container}</Spin>
                     <Spin spinning={this.state.loading} delay={500}>{container}</Spin>
                 </Card>
             </div>
        )
    }
}
