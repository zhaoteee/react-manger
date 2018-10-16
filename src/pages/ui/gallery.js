import React from 'react'
import {Card, Icon, Pagination, Steps  } from 'antd'
import './ui.less'

const Step = Steps.Step;
export default class Gallery extends React.Component {

     state = {
         mode: 'top',
     }
    onShowSizeChange = (current, pageSize)=> {
      console.log(current, pageSize);
    }
    render() {
        return (
             <div>
                 <Card title='信息提醒框'>
                     <Pagination defaultCurrent={1} total={50} />
                     <Pagination defaultCurrent={6} total={500} />
                     <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />,
                     <Pagination showQuickJumper  onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />,
                     <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                    <Pagination
                      total={85}
                      showTotal={total => `Total ${total} items`}
                      pageSize={20}
                      defaultCurrent={1}
                    />

                 </Card>
                <Card>
                    <Steps current={1}>
                        <Step title="Finished" description="This is a description." />
                        <Step title="In Progress" description="This is a description." />
                        <Step title="Waiting" description="This is a description." />
                      </Steps>
                     <Steps>
                        <Step status="finish" title="Login" icon={<Icon type="user" />} />
                        <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
                        <Step status="process" title="Pay" icon={<Icon type="loading" />} />
                        <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
                      </Steps>
                </Card>
             </div>
        )
    }
}
