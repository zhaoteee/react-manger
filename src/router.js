import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './app'

import Login from './pages/login'
import Home from './pages/home/home'
import Admin from './admin.js';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Carousel from './pages/ui/carousel'
import Gallery from './pages/ui/gallery'

import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'

import BasicTable from './pages/table/basic'
import HighTable from './pages/table/high'

import City from './pages/city/index'

import Order from './pages/order/index'
import OrderDetail from './pages/order/detail'

import User from './pages/user/index'

import BikeMap from './pages/map/bikeMap'

import Bar from './pages/echarts/bar'

import Permission from './pages/permission/index'

import Common from './common'

import NoMatch from './pages/nomatch'
export default class IRouter extends React.Component {
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route  path='/common'  render={() =>
                            <Common>
                                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
                            </Common>
                        }
                        />
                        <Route  path='/' render={() =>
                            <Admin>
                                <Switch>

                                    <Route exact={true} path='/home' component={Home}></Route>
                                    <Route exact={true} path='/ui/buttons' component={Buttons}></Route>
                                    <Route exact={true} path='/ui/modals' component={Modals}></Route>
                                    <Route exact={true} path='/ui/loadings' component={Loading}></Route>
                                    <Route exact={true} path='/ui/notification' component={Notification}></Route>
                                    <Route exact={true} path='/ui/messages' component={Messages}></Route>
                                    <Route exact={true} path='/ui/tabs' component={Tabs}></Route>
                                    <Route exact={true} path='/ui/carousel' component={Carousel}></Route>
                                    <Route exact={true} path='/ui/gallery' component={Gallery}></Route>
                                    <Route exact={true} path='/form/login' component={FormLogin}></Route>
                                    <Route exact={true} path='/form/reg' component={FormRegister}></Route>
                                    <Route exact={true} path='/table/basic' component={BasicTable}></Route>
                                    <Route exact={true} path='/table/high' component={HighTable}></Route>
                                    <Route exact={true} path='/city' component={City}></Route>
                                    <Route exact={true} path='/order' component={Order}></Route>
                                    <Route exact={true} path='/user' component={User}></Route>
                                    <Route exact={true} path='/bikeMap' component={BikeMap}></Route>
                                    <Route exact={true} path='/charts/bar' component={Bar}></Route>
                                    <Route exact={true} path='/permission' component={Permission}></Route>
                                    <Redirect to='/home' ></Redirect>
                                    <Route component={NoMatch}></Route>
                                </Switch>
                            </Admin>
                            }>
                        </Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}