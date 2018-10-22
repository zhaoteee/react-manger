import React from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'

// import echarts from 'echarts'
//按需导入
import echarts from 'echarts/lib/echarts'

//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {
    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = ()=> {
      let  option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };
        return option
    }
    getOption2 = ()=> {
      let  option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                name: "膜拜"
            },{
                data: [234, 245, 21, 423, 65, 3, 53],
                type: 'bar',
                name: "哈喽"
            },{
                data: [74, 34, 66, 26, 70, 234, 564],
                type: 'bar',
                name: "小兰"
            }]
        };
        return option
    }
    render() {
        return (
            <div>
                <Card title={'柱形图1'}>
                    <ReactEcharts option={this.getOption()} style={{height: 500}} />
                </Card>
                <Card title={'柱形图2'} style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} style={{height: 500}} />
                </Card>
            </div>
        )
    }
}