import React from 'react'
import {Card, Form, Input, Button, message, Icon, Checkbox} from 'antd'
const FormItem = Form.Item

class FormLogin extends React.Component {
    handleSubmit = ()=> {
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err, values) => {
            if(!err) {
                message.success(`${userInfo.username} 恭喜通过验证`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码' />
                        </FormItem>
                        <FormItem>
                            <Button>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='登录水平表单' style={{marginTop: 10}}>
                    <Form style={{width: 300}}>
                        <FormItem>
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
                                <Input prefix={<Icon type='user'></Icon>} placeholder='请输入用户名' />
                            )}

                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                initialValue: '1111',
                                rules: []
                            })(
                                <Input prefix={<Icon type='lock'></Icon>} placeholder='请输入密码' />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='登录水平表单' style={{marginTop: 10}}>
                    <Form style={{width: 300}}>
                        <FormItem>
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
                                <Input prefix={<Icon type='user'></Icon>} placeholder='请输入用户名' />
                            )}

                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                initialValue: '1111',
                                rules: []
                            })(
                                <Input prefix={<Icon type='lock'></Icon>} placeholder='请输入密码' />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                initialValue: false,
                                valuePropName: 'checked'
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a href="#" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin)