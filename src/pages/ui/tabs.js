import React from 'react'
import {Card, Tabs, Icon, Radio } from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane
export default class Messages extends React.Component {
     state = {
         mode: 'top',
     }
    callback = (v)=> {
        console.log(v)
    }
    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode });
     }
    render() {
         const { mode } = this.state;
        return (
             <div>
                 <Card title='信息提醒框'>
                     <Tabs defaultActiveKey="1" onChange={this.callback}>
                         <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                         <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                         <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                     </Tabs>
                 </Card>
                 <Card title='信息提醒框'>
                     <Tabs defaultActiveKey="1" onChange={this.callback}>
                         <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                         <TabPane tab="Tab 2" disabled key="2">Content of Tab Pane 2</TabPane>
                         <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                     </Tabs>
                 </Card>
                 <Card title='信息提醒框'>
                     <Tabs defaultActiveKey="2" onChange={this.callback}>
                         <TabPane tab="Tab 1" tab={<span><Icon type="apple" />Tab 1</span>} key="1">Content of Tab Pane 1</TabPane>
                         <TabPane tab="Tab 2" tab={<span><Icon type="android" />Tab 2</span>} key="2">Content of Tab Pane 2</TabPane>
                         <TabPane tab="Tab 3" tab={<span><Icon type="android" />Tab 2</span>} key="3">Content of Tab Pane 3</TabPane>
                     </Tabs>
                 </Card>
                 <Card title='信息提醒框'>
                      <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                          <Radio.Button value="top">Horizontal</Radio.Button>
                          <Radio.Button value="left">Vertical</Radio.Button>
                      </Radio.Group>
                     <Tabs
                          defaultActiveKey="1"
                          tabPosition={mode}
                          style={{ height: 220 }}
                        >
                          <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
                          <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                          <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
                          <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
                          <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
                          <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
                          <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
                          <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
                          <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
                          <TabPane tab="Tab 10" key="10">Content of tab 10</TabPane>
                          <TabPane tab="Tab 11" key="11">Content of tab 11</TabPane>
                     </Tabs>
                 </Card>
             </div>
        )
    }
}
