import React from 'react'
import './index.less'
import { Menu, Icon } from 'antd'
import {NavLink} from 'react-router-dom'
import menuList from '../../menuConfig.js'
//连接器
import { connect } from 'react-redux'
import { switchMenu } from "../../redux/action";

const SubMenu = Menu.SubMenu

class NavLeft extends React.Component {
    state = {
        currentKey: ''
    }
    componentDidMount() {
        const menuTreeNode =  this.renderMenu(menuList)
        let currentKey = window.location.hash.replace(/#|\?.*S/g, '')
        const { dispatch } = this.props;
        let title =this.getTitle(currentKey, menuList)
        dispatch(switchMenu(title))
        this.setState({
            currentKey,
            menuTreeNode
        })
    }
    handleClick = ({ item, key })=>{
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    getTitle =(key, data)=> {
        let title = ''
        console.log(data)
        data.forEach(item=>{
            if(item.key == key) {
                title = item.title
            } else if(item.key != key && item.children) {
                this.getTitle(key, item.children)
            }
        })
        return title
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
            <div className='nav-left'>
                <div className='logo'>
                    <img src='/assets/logo-ant.svg' />
                    <h1>Imooc MS</h1>
                </div>
                 <Menu  theme='dark'
                        onClick={this.handleClick}
                        selectedKeys={this.state.currentKey}>
                     {this.state.menuTreeNode}
                </Menu>        
            </div>
        )
    }
}

export default connect()(NavLeft)