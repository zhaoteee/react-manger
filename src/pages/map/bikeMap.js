import React from 'react'
import BaseForm from '../../components/BaseForm'
import {Card, Form} from 'antd'
import axios from '../../axios/index'

export default class BikeMap extends React.Component{
    state = {

    }
    map = {}
    formList = [
        {
            type: '城市'
        },{
            type: '时间查询'
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            list: [{id:'0', name: '全部'},{id:'1', name: '进行中'},{id:'2', name: '行程结束'} ]
        },
    ]
    handleFilterSubmit = (p)=>{
        this.params = p
        this.requestList()
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = ()=>{
        axios.ajax({
            url: 'bike/map',
            data: {
                params: this.params
            }
        }).then(res=>{
            if(res.code == 0) {
                this.setState({
                    total_count: res.result.total_count,

                })
                this.rendeMap(res)
            }
        })
    }
    rendeMap = (res)=> {
        let list = res.result.route_list
        this.map = new window.BMap.Map('container')
        let gps1 = list[0].split(',')
        let startPoint = new window.BMap.Point(gps1[0],gps1[1])
        let gps2 = list[list.length-1].split(',')
        let endPoint = new window.BMap.Point(gps2[0],gps2[1])
        this.map.centerAndZoom(endPoint, 11)

        let si = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42), {
            imageSize: new window.BMap.Size(36, 42)
        })
        let bms = new window.BMap.Marker(startPoint, {icon: si})
        this.map.addOverlay(bms)
        let ei = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36,42), {
            imageSize: new window.BMap.Size(36, 42)
        })
        let bme = new window.BMap.Marker(endPoint, {icon: ei})
        this.map.addOverlay(bme)

        let routeList = []
        list.forEach(item=>{
            let p = item.split(',')
            routeList.push(new window.BMap.Point(p[0], p[1]))
        })

        let polyline = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 0.5,

        })
        this.map.addOverlay(polyline)

        //    绘制服务区
        let servicep = []
        let sl = res.result.service_list
        sl.forEach(item=> {
            servicep.push(new window.BMap.Point(item.lon, item.lat))
        })
        let polyserviceLine = new window.BMap.Polyline(servicep, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 0.5,
        })
        this.map.addOverlay(polyserviceLine)

        //  添加地图中自行车图标
        let bikeList = res.result.bike_list
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42),
        })
        bikeList.forEach(item=>{
            let p = item.split(',')
            let point = new window.BMap.Point(p[0],p[1])
            let bme = new window.BMap.Marker(point, {icon: bikeIcon})
            this.map.addOverlay(bme)
        })
    }
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} fieldsSubmit={this.handleFilterSubmit}></BaseForm>
                </Card>
                <Card>
                    <div>
                        共100辆
                    </div>
                    <div id='container' style={{ height: 500}}></div>
                </Card>
            </div>
        )
    }
}