import React from 'react'
import {Card, Table} from 'antd'
import axios from '../../axios/index'
import utils from '../../util/util'
export default class BasicTable extends React.Component {
    state = {
        dataSource2: []
    }
    params = {
        page: 1
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
        dataSource.map((item, indx)=> {
            item.key = indx
        })
        this.setState({
            dataSource
        })
        this.request()
    }
    request = ()=>{
        let _this = this
        let base_url = 'https://www.easy-mock.com/mock/5ad430cacdecd20f040889cd/htgl'

        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res=>{
             res.result.list.map((item, indx)=> {
                item.key = indx
            })
            this.setState({
                dataSource2: res.result.list,
                pagination: utils.pagination(res, current=>{
                    _this.params.page = current
                    _this.request()
                })
            })
        })
    }
    onRowClick = (record, index)=> {
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
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
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'xianyu',
                        '2': 'langzhi',
                        '3': 'caizi',
                        '4': 'asdada',
                        '5': 'asdaddga'
                    }
                    return config[state]
                }
            },{
                title: '爱好',
                dataIndex: 'interest',
                render(ab) {
                    let config = {
                        '1': 'xianyu',
                        '2': 'langzhi',
                        '3': 'caizi',
                        '4': 'asdada',
                        '5': 'asdaddga',
                        '6': 'hgfaada',
                        '7': 'aspihajg'
                    }
                    return config[ab]
                }
            },{
                title: '生日',
                dataIndex: 'birdthday'
            },
        ]
        let {selectedRowKeys} = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows)=>{
                let ids = []
                selectedRows.map(item=>{
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedRowIds: ids
                })
            }
        }
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
                <Card title={'MOCK单选表格'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        onRow={(record, index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record, index) // 点击行
                              },
                            };
                        }}
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource2}
                        columns={colums}
                        pagination={false}
                    ></Table>
                </Card>
                <Card title={'MOCK复选表格'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        columns={colums}
                        pagination={false}
                    ></Table>
                </Card>
                <Card title={'MOCK表格分页'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={colums}
                        pagination={this.state.pagination}
                    ></Table>
                </Card>
            </div>
        )
    }
}
