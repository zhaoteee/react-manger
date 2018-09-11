import React from 'react'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

import Main from './Main'
import About from './About'
import Topic from './Topic'
export default class Home extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><Link to='/'>11111111</Link></li>
                        <li><Link to='/about'>222222222</Link></li>
                        <li><Link to='/topics'>333333333</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact={true} path='/' component={Main}></Route>
                        <Route path='/about' component={About}></Route>
                        <Route path='/topics' component={Topic}></Route>

                    </Switch>

                </div>
            </HashRouter>
        )
    }
}