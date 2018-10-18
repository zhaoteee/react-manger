import React from 'react'
import {Card } from 'antd'
import axios from '../../axios/index'
import './detail.less'
export default class BasicTable extends React.Component {
    state = {
    }
    params = {
        page: 1
    }
    componentDidMount() {
        let orderId = this.props.match.params.orderId
        if(orderId) {
            this.request(orderId)
        }

    }
    request = (orderId)=> {
        axios.ajax({
            url: 'order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then(res=>{
            if(res.code == 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result)
            }
        })
    }
    renderMap =(v)=> {
        // 百度地图API功能
        let map = new window.BMap.Map("map");
        this.map = map
        // 创建Map实例
        // map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new window.BMap.MapTypeControl({
            mapTypes:[
                window.BMAP_NORMAL_MAP,
                window.BMAP_HYBRID_MAP
            ]}));
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        this.drawBikeRoute(v.position_list)
        this.drawServerArea(v.area)
    }
    drawBikeRoute = (post)=> {
        let map = this.map;
        let start = ''
        let end = ''
        if(post.length > 0) {
            let arr = post[0]
            let last = post[post.length-1]
            start = new window.BMap.Point(arr.lon, arr.lat)
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42),
                {imageSize: new window.BMap.Size(36, 42),
                anchor:  new window.BMap.Size(36, 42)} )
            let startMarker = new window.BMap.Marker(start, {icon: startIcon})
            this.map.addOverlay(startMarker)

            end = new window.BMap.Point(last.lon, last.lat)
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42),
                {imageSize: new window.BMap.Size(36, 42),
                anchor:  new window.BMap.Size(36, 42)} )
            let endMarker = new window.BMap.Marker(end, {icon: endIcon})
            this.map.addOverlay(endMarker)

            //  链接路线图
            let tp = []
            for (let i=0; i<post.length; i++) {
                let p = post[i]
                tp.push(new window.BMap.Point(p.lon, p.lat))

            }
            let line = new window.BMap.Polyline(tp, {
                strokeColor: '#1869ad',
                strokeWeight: 3,
                strokeOpacity: 0.8
            })
            this.map.addOverlay(line)
            map.centerAndZoom(end, 11)


        }
    }
    //
    drawServerArea(post) {
        let tp = []
        for (let i=0; i<post.length; i++) {
            let p = post[i]
            tp.push(new window.BMap.Point(p.lon, p.lat))

        }
        let g = new window.BMap.Polygon(tp, {
            strokeColor: '#ce0000',
            strokeWeight: 3,
            strokeOpacity: 0.8,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(g)
    }
    render() {
        let info = this.state.orderInfo||{}
        return (
            <div>
                <Card>
                    <div id={'map'} className={'order-map'}></div>

                    <div className={'detail-items'}>
                        <div className='item-title'>基础信息</div>
                        <div className='item-form'>
                            <ul>
                                <li>
                                    <div className='detail-form-left'>用车模式</div>
                                    <div className='detail-form-content'>{info.mode==1?'服务器':'停车点'}</div>
                                </li>
                                <li>
                                    <div className='detail-form-left'>订单编号</div>
                                    <div className='detail-form-content'>{info.order_sn}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>

            </div>
        )
    }
}
