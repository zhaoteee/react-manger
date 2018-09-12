import React from 'react'
import {Card, Button, Icon, Radio } from 'antd'
import './ui.less'
const ButtonGroup = Button.Group;
export default class Buttons extends React.Component {
     state = {
        loading: false,
        iconLoading: false,
         value: 1
     }

     enterLoading = () => {
        this.setState({ loading: true });
     }

     enterIconLoading = () => {
        this.setState({ iconLoading: true });
     }
     onChange = () => {

     }
    render() {
        return (
             <div>
                 <Card title='基础按钮'>
                     <Button type="primary">Primary</Button>
                     <Button>Default</Button>
                     <Button type="dashed">Dashed</Button>
                     <Button type="danger">Danger</Button>
                     <Button type="primary" disabled>Primary(disabled)</Button>
                 </Card>
                 <Card title='图形按钮'>
                     <Button type="primary" shape="circle" icon="search" />
                      <Button type="primary">
                        <Icon type="left" />Backward
                      </Button>
                      <Button type="primary">
                        Forward<Icon type="right" />
                      </Button>
                     <Button type="primary" loading>
                      Loading
                     </Button>
                      <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                            Click me!
                        </Button>
                 </Card>
                 <Card title='图形按钮'>
                     <Button type="primary" shape="circle" icon="search" />
                     <Button.Group>
                      <Button type="primary">
                        <Icon type="left" />Backward
                      </Button>
                      <Button type="primary">
                        Forward<Icon type="right" />
                      </Button>
                     </Button.Group>
                     <ButtonGroup>
                        <Button type="primary" loading>
                            Loading
                        </Button>
                        <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                            Click me!
                        </Button>
                     </ButtonGroup>
                 </Card>
                 <Card title='图形按钮'>
                     <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                      </Radio.Group>
                      <Radio.Group size="large" onChange={this.onChange} defaultValue="a">
                        <Radio.Button value="a">Hangzhou</Radio.Button>
                        <Radio.Button value="b">Shanghai</Radio.Button>
                        <Radio.Button value="c">Beijing</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                      </Radio.Group>
                 </Card>
             </div>
        )
    }
}
