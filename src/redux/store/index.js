/*
* 引入createStore
* */

import {createStore} from 'redux'
import reducer  from '../reducer'

import { composeWithDevTools } from 'redux-devtools-extension'
const config = (prevState)=>createStore(reducer, composeWithDevTools())
export default config