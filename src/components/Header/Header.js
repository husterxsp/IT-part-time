import React from 'react';
import {
    Link,
    IndexLink
}
from 'react-router';
import {
    Button
} from 'antd';
import './Header.less';

export default class Header extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.logout();
        this.context.router.push('/auth/login');
    }
    render() {
        const user = this.props.user;
        return (
            <div className="header">
                <div className="header-content">
                    <Link className="logo" to="/">
                        <img src={require('../../static/img/logo.png')} className="" alt="logo"/>IT兼职网
                    </Link>
                    <div className="nav">
                        <IndexLink activeClassName="active" className="list" to="/">首页</IndexLink>
                        <Link activeClassName="active" className="list"  to="/about">关于</Link>
                    </div>
                    {(()=>{
                        if(user.name){
                            return (
                                <div className="me">
                                    <Link activeClassName="active" className="avatar-link" to="/user">
                                        <img src={require('../../static/img/avatar.png')} className="avatar" alt="avatar"/>
                                        Hello, {user.name}
                                    </Link>
                                    <Button type="primary" onClick={this.logout}>退出登录</Button>
                                </div>       
                            )
                        }
                        else {
                            return (
                                <div className="sign">
                                    <Link activeClassName="active" to="/auth/login">登录</Link>
                                    <Link activeClassName="active" to="/auth/register">注册</Link>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        );
    }
}
