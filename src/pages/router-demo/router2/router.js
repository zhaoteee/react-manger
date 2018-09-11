import React from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Main from './../Main'
import About from './../About'
import Topic from './../Topic'
import Home from './Home'

export default class IRouter extends React.Component{
    render() {
        return (
            <Router>
                <Home>
                    <Route exact={true} path='/' component={Main}></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/topics' component={Topic}></Route>
                </Home>
            </Router>

        )
    }
}