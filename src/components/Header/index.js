import React from 'react'
import {Row, Col} from 'antd'
import './index.less'
import Util from '../../util/util'
import axios from '../../axios/index'
export default class Header extends React.Component {
    componentWillMount() {
        this.setState({
            username: '河畔一角'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData() {
        let city = '北京'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city) +'&output=json&ak=KHKnTpAKGzB6EVYSc90S2ICcGDwPCpwZ'
        }).then((res)=>{
            console.log(res)
        })
    }
    render() {
        const menuType = this.props.menuType
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?
                            <Col span='3' className={'logo'}>
                                <img src="/assets/logo-ant.svg" alt=""/>
                                通用管理系统
                            </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.username}</span>
                        <a href="">退出</a>
                    </Col>
                </Row>
                {
                    menuType?"":
                       <Row className='breadcrumb'>
                    <Col span='4' className='breadcrumb-title'>首页</Col>
                    <Col span='20' className='weather'>
                        <span className='data'>{this.state.sysTime}</span>
                        <span className='weather-data'>晴转多云</span>
                    </Col>
                </Row>
                }

            </div>
        )
    }
}