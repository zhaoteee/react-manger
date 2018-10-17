import React from 'react'
import {Card, Table, Badge, Modal, Button} from 'antd'
import axios from '../../axios/index'
import utils from '../../util/util'
export default class BasicTable extends React.Component {
    state = {
        dataSource2: [],
        dataSource3:[],
        sortOrder: ''
    }
    params = {
        page: 1
    }
    componentDidMount() {

        this.request()
        this.request1()
    }
    request = ()=>{
        let _this = this
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
                dataSource: res.result.list,
                pagination: utils.pagination(res, current=>{
                    _this.params.page = current
                    _this.request()
                })
            })
        })
    }
    request1 = ()=>{
        let _this = this
        axios.ajax({
            url: '/table/high/list',
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
                dataSource3: res.result.list,
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
    handleChange = (pagination, filters, sorter)=>{
        this.setState({
            sortOrder: sorter.order
        })
    }
    handleDelete = (item)=>{
        let id = item.id
        Modal.confirm({
            title: '确定',
            content: '删除吗？'
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
            }, {
                title: '年龄',
                dataIndex: 'age'
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
        const colums3 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            }, {
                title: '年龄',
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder,
                dataIndex: 'age'
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
        const colums4 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            }, {
                title: '年龄',
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder,
                dataIndex: 'age'
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
                        '1': <Badge status={'success'} text={'游泳'}/>,
                        '2': <Badge status={'error'} text={'打篮球'}/>,
                        '3': <Badge status={'default'} text={'哈哈'}/>,
                        '4': 'asdada',
                        '5': 'asdaddga',
                        '6': 'hgfaada',
                        '7': 'aspihajg'
                    }
                    return config[ab]
                }
            },{
                title: '操作',
                render: (text, item)=> {
                    //箭头函数作用域问题

                    return <Button  onClick={(item)=> {this.handleDelete(item)}}>删除</Button>
                }
            },
        ]
        const colums2 = [
            {
                title: 'id',
                fixed: 'left',
                width: 80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                width: 80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                fixed: 'right',
                width: 80,
                render(sex) {
                    return sex == 1 ? '男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 120,
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
                width: 120,
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
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
                dataIndex: 'birdthday'
            },{
                title: '生日',
                width: 120,
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
                <Card title={'头部固定'}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={colums}
                        pagination={false}
                        scroll={{y: 240}}
                    ></Table>
                </Card>
                <Card title={'左侧固定'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={colums2}
                        pagination={false}
                        scroll={{x: 2800}}
                    ></Table>
                </Card>
                <Card title={'表格排序'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource3}
                        columns={colums3}
                        pagination={false}
                        onChange={this.handleChange}
                    ></Table>
                </Card>
                 <Card title={'表格操作'} style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource3}
                        columns={colums4}
                        pagination={false}
                        onChange={this.handleChange}
                    ></Table>
                </Card>
            </div>
        )
    }
}
