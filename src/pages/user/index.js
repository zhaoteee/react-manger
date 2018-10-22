import React from 'react'
import {Button, Card, Table, Modal,Form,Input,Radio, DatePicker,Select} from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from '../../axios'
import moment from 'moment'
import utils from './../../util/util'
import ETable from '../../components/ETable/index'

const Option = Select.Option
export default class User extends React.Component {
    params = {
        page: 1
    }
    state = {
        list: [],
        isVisible: false,
        title: ''
    }
    formList = [{
        type: 'INPUT',
        label: '用户名',
        placeholder: '输入用户名',
        field: 'user_name',
        width: 80,
    },{
        type: 'INPUT',
        label: '手机号',
        placeholder: '输入手机号',
        field: 'user_mobile',
        width: 80,
    },{
        type: 'DATE',
        label: '请选择入职日期',
        field: 'user_date',
        placeholder: '请选择日期',
    } ]
    componentDidMount() {
        this.requestList()
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    handleFilter = (params)=> {
        this.params = params
        this.requestList()
    }
    requestList = ()=> {
        axios.requestList(this, 'table/list1', this.params)
    }
    handleOperate = (type)=> {
        let item = this.state.selectedItem
        if (type == 'create') {
            this.setState({
                type,
                isVisible:true,
                 title: '创建员工'
            })
        }else if (type == 'edit') {
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择用户'
                })
                return
            }
            this.setState({
                type,
                isVisible:true,
                title: '编辑员工',
                userInfo: item
            })
        } else if (type == 'detail') {
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择用户'
                })
                return
            }
            this.setState({
                type,
                isVisible:true,
                title: '员工详情',
                userInfo: item
            })
        } else if (type == 'delete') {
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择用户'
                })
                return
            }
            Modal.info({
                title: '确认',
                content: '一定要删除吗？',
                onOk: ()=>{
                    axios.ajax({
                        url: 'table/list1',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then(res=>{
                        this.requestList()
                    })
                }
            })
        }
    }
    //创建
    handleSubmit =()=>{
        let type = this.state.type
        let data = this.userForm.props.form.getFieldsValue();

        axios.ajax({
            url: 'table/list1',
            data: {
                params: data
            }
        }).then(res=>{
            if(res.code == 1) {
                this.requestList()
                this.setState({
                    isVisible: false
                })
            }
        })
    }
    render(){
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },{
                title: '用户名',
                dataIndex: 'username'
            },{
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex=='1'? '男':'女'
                }
            },{
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    return {
                        "1": 'sas',
                        "2": '123',
                        "3": '12341',
                        "4": '2425as',
                        "5": 'dada'
                    }[status]
                }
            },{
                title: '爱好',
                dataIndex: 'interest'
            },
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (

            <div>
                <Card>
                    <BaseForm formList={this.formList} fieldsSubmit={this.handleFilter}></BaseForm>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button icon={'plus'} onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button  icon={'edit'} onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button  onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button  icon={'delete'}  onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className={'content-wrap'}>
                    <Table
                        bordered
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isVisible: false
                        })
                    }}
                >
                    <UserForm type={this.state.type}
                              userInfo={this.state.userInfo}
                              wrappedComponentRef={(inst)=>{this.userForm=inst}}></UserForm>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    render() {
        let type =this.props.type
        let userInfo = this.props.userInfo
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout={'horizontal'}>
                <Form.Item label='用户名' {...formItemLayout}>
                    {
                        type=='detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue: userInfo.username
                        })(
                            <Input type={'text'} palceholder={'输入用户名'} />
                        )
                    }
                </Form.Item>
                <Form.Item label='性别' {...formItemLayout}>
                    {
                        type=='detail'?userInfo.sex==1?"男":"女":
                        getFieldDecorator('sex',{
                            initialValue: userInfo.sex
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label='state' {...formItemLayout}>
                    {
                        type=='detail'?userInfo.status:
                        getFieldDecorator('state',{
                            initialValue: userInfo.status
                        })(
                            <Select>
                                <Option value={1}>asda</Option>
                                <Option value={2}>qweqw</Option>
                                <Option value={3}>wqeqwe</Option>
                                <Option value={4}>qweqw</Option>
                                <Option value={5}>twetwr</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='生日' {...formItemLayout}>
                    {
                        type=='detail'?userInfo.birdthday:
                        getFieldDecorator('date',{
                            initialValue: moment(userInfo.birdthday)
                        })(
                            <DatePicker></DatePicker>
                        )
                    }
                </Form.Item>
                <Form.Item label='联系地址' {...formItemLayout}>
                    {
                         type=='detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue: userInfo.address
                        })(
                            <Input.TextArea rows={3}/>                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)