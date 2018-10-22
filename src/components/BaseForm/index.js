import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import utils from '../../util/util'
const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue()
        this.props.fieldsSubmit(fieldsValue)
    }
    reset = ()=> {
        this.props.form.resetFields()
    }
    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList
        const formItemList = []
        if (formList && formList.length) {
            formList.forEach((item, i) =>{
                let label = item.label
                let field = item.field
                let initValue = item.initialValue || ''
                let placeHolder = item.placeholder
                let width = item.width
                if (item.type == '时间查询') {
                    const begin_time = <FormItem label={'订单时间'} key={i+'s'}>
                        {
                         getFieldDecorator('begin_time' )(
                                <DatePicker
                                    showTime={true}
                                    format="YYYY-MM-DD HH:mm:ss"
                                ></DatePicker>
                          )
                        }
                    </FormItem>
                    formItemList.push(begin_time)
                     const end_time = <FormItem label={'~'} colon={false} key={i+'end_time'}>
                        {
                         getFieldDecorator('end_time' )(
                                <DatePicker
                                    showTime={true}
                                    format="YYYY-MM-DD HH:mm:ss"
                                ></DatePicker>
                          )
                        }
                    </FormItem>
                    formItemList.push(end_time)
                } else if (item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={i}>
                        {
                         getFieldDecorator([field], {
                            initialValue: initValue
                         })(
                                <Input type={'text'} placeHolder={placeHolder}/>
                          )
                        }
                    </FormItem>
                    formItemList.push(INPUT)
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={i}>
                        {getFieldDecorator(field, {
                            initialValue: initValue
                         })(
                                <Select
                                    style={{width:width}}
                                    placeholder={placeHolder}
                                >
                                    { utils.getOptionList(item.list) }
                                </Select>
                          )}
                    </FormItem>
                    formItemList.push(SELECT)
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={i}>
                        {getFieldDecorator(field, {
                            valuePropName: 'checked',
                            initialValue: initValue
                         })(
                                <Checkbox>

                                </Checkbox>
                          )}
                    </FormItem>
                    formItemList.push(CHECKBOX)
                } else if (item.type == 'DATE') {
                    const DATE = <FormItem label={label} key={label}>
                        {
                         getFieldDecorator(field)(
                                <DatePicker
                                    showTime={true}
                                    format="YYYY-MM-DD HH:mm:ss"
                                ></DatePicker>
                          )
                        }
                    </FormItem>
                    formItemList.push(DATE)
                }
            })
        }
        return formItemList
    }
    render() {
        return (
            <Form layout={'inline'}>
                {this.initFormList()}
                <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                <Button onClick={this.reset}>重置</Button>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm)