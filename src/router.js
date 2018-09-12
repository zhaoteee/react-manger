import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './app'

import Login from './pages/login'
import Admin from './admin.js';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'

import NoMatch from './pages/nomatch'
export default class IRouter extends React.Component {
    render(){
        return (
            <HashRouter>
                <App>
                    <Route path='/login' component={Login}></Route>
                    <Route  path='/admin' render={() =>
                        <Admin>
                            <Switch>
                                <Route exact={true} path='/admin/ui/buttons' component={Buttons}></Route>
                                <Route exact={true} path='/admin/ui/modals' component={Modals}></Route>
                                <Route exact={true} path='/admin/ui/loadings' component={Loading}></Route>
                                <Route exact={true} path='/admin/ui/notification' component={Notification}></Route>
                                <Route exact={true} path='/admin/ui/messages' component={Messages}></Route>
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                        }>
                    </Route>
                    <Route path='/order/detail' component={Login}></Route>
                </App>
            </HashRouter>
        )
    }
}