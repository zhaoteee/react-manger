import React from 'react'
import {Card, Button, Table, Form, Input, Radio, Select, Modal, Tree, Transfer} from 'antd'
import axios from '../../axios/index'
import menuConfig from '../../menuConfig'
import util from './../../util/util'
import moment from "moment";
const TreeNode = Tree.TreeNode;
const Option = Select.Option
export default class Bar extends React.Component {
    state = {
        list: [],
        isVisible: false,
        isPermissionVisible:false,
        isuserAuthVisible: false,
    }
    componentWillMount() {
        axios.requestList(this, 'role/list', {})
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    handleSubmit = ()=> {
        let data = this.roleForm.props.form.getFieldsValue()
        axios.ajax({
            url: 'table/list1'
        }).then(res=>{
            if(res.code == 0) {
                this.setState({
                    isVisible: false
                })
                axios.requestList(this, 'role/list', {})
            }
        })
    }
    createPermission =()=>{
        this.setState({
            isVisible:true
        })
    }
    checkKeys  =(data)=>{
        this.props.patchMenuInfo(data)
    }
    //权限设置
    handlePermission = ()=> {
        let item = this.state.selectedItem;
        console.log(item)
        if(!item) {
            console.log(333)
            Modal.info({
                title:'请选择角色'
            })
            return
        }
        this.setState({
            isPermissionVisible:true,
            menuInfo: item.menus
        })
    }
    //权限设置
    userAuth = ()=> {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title:'请选择角色'
            })
            return
        }
        this.getRoleList(item)


    }
    getRoleList= (item)=>{
        axios.ajax({
            url: 'role/user_list'
        }).then(res=>{
            if(res) {
                this.getAuthUserList(res.result)
                this.setState({
                    isuserAuthVisible:true,
                    detailInfo: item
                })
            }
        })
    }
    getAuthUserList = (ds)=> {
        const mockData = []
        const targetKeys = []
        if (ds && ds.length) {
            ds.forEach((item, idx)=>{
                const data = {
                    key: item.user_id,
                    title: item.user_name,
                    status: item.status
                }
                if(data.status == 1) {
                    targetKeys.push(data.key)
                }
                mockData.push(data)
            })
        }
        this.setState({
            mockData, targetKeys
        })
    }
    handlePermissionSubmit = ()=>{
        let data = this.permForm.props.form.getFieldsValue()
        data.role_id = this.state.selectedItem.id
        data.munus = this.state.menuInfo
        axios.ajax({
            url: 'table/list1',
            data: {
                params: {
                    ...data
                }
            }
        }).then(res=>{
            if(res.code == 1) {
                axios.requestList(this, 'role/list', {})
            }
        })
    }
    changeKey = (targetKeys)=> {
        console.log(targetKeys)
        this.setState({ targetKeys });
    }
    render() {
        const columns = [
            {
                title:'角色ID',
                dataIndex:'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time'
            }, {
                title: '使用状态',
                dataIndex: 'status',
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time'
            }, {
                title: '授权人',
                dataIndex: 'authorize_user',
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card title={' '}>
                    <Button onClick={this.createPermission}>创建权限</Button>
                    <Button onClick={this.handlePermission}>设置权限</Button>
                    <Button onClick={this.userAuth}>用户授权</Button>
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
                    title={'创建权限'}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}></RoleForm>
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.isPermissionVisible}
                    onOk={this.handlePermissionSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermissionVisible: false
                        })
                    }}
                >
                    <PermissionEditForm
                        detailInfo={this.state.selectedItem}
                        menuInfo={this.state.menuInfo}
                        wrappedComponentRef={(inst)=>this.permForm=inst}
                        patchMenuInfo={(data)=>{
                            this.setState({
                                menuInfo: data
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title='用戶授權'
                    visible={this.state.isuserAuthVisible}
                    onOk={this.handleUserAuthSubmit}
                    onCancel={()=>{
                        this.setState({
                            isuserAuthVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        detailInfo={this.state.detailInfo}
                        wrappedComponentRef={(inst)=>this.userAuthForm=inst}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        changeKey={(keys)=>{this.changeKey(keys)}}
                    />
                </Modal>
            </div>
        )
    }
}
class RoleForm extends React.Component{
    render() {
        let type =this.props.type
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout={'horizontal'}>
                <Form.Item label='用户名' {...formItemLayout}>
                    {
                        getFieldDecorator('user_name',{
                            initialValue: ''
                        })(
                            <Input type={'text'} palceholder={'输入角色名'} />
                        )
                    }
                </Form.Item>

                <Form.Item label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </Form.Item>

            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)

class PermissionEditForm extends React.Component {
    renderTreeNodes = (data)=> {
        return data.map((item)=>{
            if(item.children) {
                return <TreeNode
                    title={item.title}
                    key={item.key}
                >
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else {
                return <TreeNode title={item.title} key={item.key} />
            }
        })
    }
    checkKeys = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    render() {
        let detail = this.props.detailInfo
        let menuInfo = this.props.menuInfo
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout={'horizontal'}>
                <Form.Item label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator('user_name',{
                            initialValue: ''
                        })(
                            <Input disabled type={'text'} placeholder={detail.role_name} />
                        )
                    }
                </Form.Item>

                <Form.Item label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.checkKeys(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title={'平台权限'} key={'1'}>
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>

            </Form>
        )
    }
}
PermissionEditForm = Form.create({})(PermissionEditForm)

class RoleAuthForm extends React.Component {

    checkKeys = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
      }
      handleChange = (targetKeys) => {
        this.props.changeKey(targetKeys);
      }
    render() {
        let detail = this.props.detailInfo
        let menuInfo = this.props.menuInfo
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout={'horizontal'}>
                <Form.Item label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator('user_name',{
                            initialValue: ''
                        })(
                            <Input disabled type={'text'} placeholder={detail.role_name} />
                        )
                    }
                </Form.Item>
                <Transfer
                    dataSource={this.props.mockData}
                    targetKeys={this.props.targetKeys}
                    titles={['待選用戶', '已選']}
                    showSearch
                    filterOption={this.filterOption}
                    render={item=>item.title}
                    onChange={this.handleChange}
                />

            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)