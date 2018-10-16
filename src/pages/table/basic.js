import React from 'react'
import {Card, Table} from 'antd'
import axios from 'axios'
export default class BasicTable extends React.Component {
    state = {
        dataSource2: []
    }
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'jack',
                sex: '1',
                state: '1',
                interest: '1',
                birdthday: '2013-2-22'
            },
            {
                id: '1',
                userName: '213qweqw',
                sex: '1',
                state: '1',
                interest: '1',
                birdthday: '2013-2-22'
            },
            {
                id: '2',
                userName: 'jaasfafck',
                sex: '1',
                state: '1',
                interest: '1',
                birdthday: '2013-2-22'
            }
        ]
        this.setState({
            dataSource
        })
        this.request()
    }
    request = ()=>{
        console.log(this)
        let base_url = 'https://www.easy-mock.com/mock/5ad430cacdecd20f040889cd/htgl'
        axios.get(base_url+'/table/list').then(res=>{
            if(res.status == 200 && res.data.code == 0) {
                this.setState({
                    dataSource2: res.data.result.list
                })
            }
        })
    }
    render() {
        // const { getFieldDecorator } = this.props.form;
        const colums = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },{
                title: '爱好',
                dataIndex: 'interest'
            },{
                title: '生日',
                dataIndex: 'birdthday'
            },
        ]
        return (
            <div>
                <Card title={'基础表格'}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={colums}
                        pagination={false}
                    ></Table>
                </Card>
                <Card title={'动态数据表格'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={colums}
                        pagination={false}
                    ></Table>
                </Card>
            </div>
        )
    }
}
