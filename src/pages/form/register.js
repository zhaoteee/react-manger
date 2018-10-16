import React from 'react'
import {Card, Form, Input, Button,
    message, Icon, Checkbox, Radio,
    Select, Switch, DatePicker, TimePicker, Upload, InputNumber} from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
 class FormRegister extends React.Component {
    state = {
        loading: false,
        imageUrl: ''
    };


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
    }
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.username} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4,
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return (
            <div>
                <Card title={'注册表单'}>
                    <Form layout='horizontal'>
                        <FormItem label={'用户名'} {...formItemLayout}>
                            {getFieldDecorator('username', {
                                initialValue: 'jack',
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    },
                                    {
                                        min: 5, max: 11,
                                        message: '长度不在范围内'
                                    },
                                ]
                            })(
                                <Input placeholder='请输入用户名' />
                            )}
                        </FormItem>
                         <FormItem label={'密码'} {...formItemLayout}>
                            {getFieldDecorator('password', {
                                initialValue: 'jack',
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    },
                                ]
                            })(
                                <Input placeholder='请输入密码' />
                            )}
                        </FormItem>
                        <FormItem label={'性别'} {...formItemLayout}>
                            {getFieldDecorator('wqe', {
                                initialValue: '1',
                            })(
                                <Radio.Group>
                                    <Radio value={'1'}>男</Radio>
                                    <Radio value={'2'}>女</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        <FormItem label={'年龄'} {...formItemLayout}>
                            {getFieldDecorator('wqeqw', {
                                initialValue: '19',
                            })(
                                <InputNumber></InputNumber>
                            )}
                        </FormItem>
                        <FormItem label={'当前状态'} {...formItemLayout}>
                            {getFieldDecorator('wq12eqw', {
                                initialValue: '2',
                            })(
                                <Select>
                                    <Option value='1'>第0条</Option>
                                    <Option value='2'>第1条</Option>
                                    <Option value='3'>第2条</Option>
                                    <Option value='4'>第3条</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label={'爱好'} {...formItemLayout}>
                            {getFieldDecorator('love', {
                                initialValue: ['1','2'],
                            })(
                                <Select mode='multiple'>
                                    <Option value='1'>有用</Option>
                                    <Option value='2'>跑步</Option>
                                    <Option value='3'>帕莎</Option>
                                    <Option value='4'>骑行</Option>
                                    <Option value='5'>唱歌</Option>
                                    <Option value='6'>学习</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label={'已婚'} {...formItemLayout}>
                            {getFieldDecorator('ismarried', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Switch></Switch>
                            )}
                        </FormItem>
                        <FormItem label={'生日'} {...formItemLayout}>
                            {getFieldDecorator('birdthday', {
                                initialValue: moment('2018-9-10'),
                            })(
                                <DatePicker
                                    showTime
                                    format={'YYYY-MM-DD hh:mm'}
                                ></DatePicker>
                            )}
                        </FormItem>
                        <FormItem label={'联系地址'} {...formItemLayout}>
                            {getFieldDecorator('address', {
                                initialValue: '北京市海淀',
                            })(
                                <Input.TextArea
                                    autosize={
                                        {
                                            minRows: 4,
                                            maxRows: 6
                                        }
                                    }
                                />
                            )}
                        </FormItem>
                        <FormItem label={'早起时间'} {...formItemLayout}>
                            {getFieldDecorator('weakup', {
                            })(
                                 <TimePicker
                                 ></TimePicker>
                            )}
                        </FormItem>
                        <FormItem label={'头像'} {...formItemLayout}>
                            {getFieldDecorator('userimg', {
                            })(
                                <Upload
                                    onChange={this.handleChange}
                                    listType="picture-card"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                >
                                    {this.state.imageUrl?
                                        <img src={this.state.imageUrl} alt=""/>:<Icon type='plus'/>}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem   {...offsetLayout}>
                            {getFieldDecorator('asdasdga', {
                            })(
                                <Checkbox>
                                    我已阅读<a>木科协</a>
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>

            </div>
        )
    }
}
export default Form.create()(FormRegister)