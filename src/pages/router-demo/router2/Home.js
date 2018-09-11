import React from 'react'
import {Link} from 'react-router-dom'

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <ul>
                        <li><Link to='/'>444</Link></li>
                        <li><Link to='/about'>555</Link></li>
                        <li><Link to='/topics'>6666</Link></li>
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}