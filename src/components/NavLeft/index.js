import React from 'react'
import './index.less'
import { Menu, Icon } from 'antd'
import {NavLink} from 'react-router-dom'
import menuList from '../../menuConfig.js'

const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component {
    componentWillMount() {
        const menuTreeNode =  this.renderMenu(menuList)
        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu = (data)=> {
        return data.map((item)=>{
            if(item.children) {
               return (<SubMenu title={item.title} key={item.key}>
                   {this.renderMenu(item.children)}
               </SubMenu>)
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (
            <div >
                <div className='logo'>
                    <img src='/assets/logo-ant.svg' />
                    <h1>Imooc MS</h1>
                </div>
                 <Menu  theme='dark' >
                     {this.state.menuTreeNode}
                </Menu>        
            </div>
        )
    }
}