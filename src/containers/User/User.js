import React from 'react';
import {
    Link
}
from 'react-router';
import './User.less';
import '../../static/font/css/fontello.css';
import {
    connect
} from 'react-redux';
@connect(
    state => ({
        auth: state.auth
    })
)
export default class User extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="user clearfix">
                <div className="left">
                    <div className="level">
                        <img className="avatar" src={require('../../static/img/avatar.png')}/>
                        <div className="username">{this.props.auth.user.name}</div>
                        <div className="level-content">
                            积分: {this.props.auth.user.level || 0}
                        </div>
                    </div>
                    <div className="nav">
                        <Link activeClassName={"active"} className="item" to="/user/setting">
                            <i className="icon-cog-outline"></i>个人信息设置</Link>
                        <Link activeClassName={"active"} className="item" to="/user/publish">
                            <i className="icon-pencil"></i>发布项目</Link>
                        <Link activeClassName={"active"} className="item" to="/user/published">
                            <i className="icon-spin3"></i>已发布项目</Link>
                        <Link activeClassName={"active"} className="item" to="/user/applied">
                            <i className="icon-flag"></i>已申请项目</Link>
                    </div>
                </div>
                <div className="right">
                    <div className="achieve">
                        <div className="title">我的成就</div>
                        <div className="achieve-content">
                            <div className="item">
                                <div className="value">0</div>
                                <div className="name">已承接项目</div>
                            </div>
                            <div className="item">
                                <div className="value">0</div>
                                <div className="name">已发布项目</div>
                            </div>
                            <div className="item">
                                <div className="value">￥0</div>
                                <div className="name">总收入</div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
