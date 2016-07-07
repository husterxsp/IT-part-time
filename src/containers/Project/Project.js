import React from 'react';
import {
    Link
}
from 'react-router';
import {
    Button,
    Row,
    Col,
    message
} from 'antd';

import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as projectActions from '../../actions/projectAction';
import './project.less';

@connect(
    state => ({
        auth: state.auth,
        project: state.project
    }),
    dispatch => ({
        projectActions: bindActionCreators(projectActions, dispatch)
    })
)
export default class Project extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            _id
        } = this.props.params;
        this.props.projectActions.getProject(_id);
        this.apply = this.apply.bind(this);
    }
    apply() {
        const value = {
            userID: this.props.auth.user._id,
            userName: this.props.auth.user.name,
            userPhone: this.props.auth.user.phone,
            publisherID: this.props.project.detailProject.userID,
            projectID: this.props.project.detailProject._id,
            projectName: this.props.project.detailProject.name,
            projectType: this.props.project.detailProject.type
        }

        if (this.props.auth.user._id == this.props.project.detailProject.userID) {
            message.error("不允许申请自己发布的项目！");
            return;
        }

        if (!value.userID) {
            message.error("请先登录！");
            return;
        }
        this.props.projectActions.apply(value);
    }
    render() {
        const {
            detailProject
        } = this.props.project;
        detailProject.roles = detailProject.roles || [];
        const date = new Date(detailProject.deadline);
        return (
            <div className="project clearfix">
                <div className="left">
                    <div className="title-container">
                        <div className="title-row">
                            <span className="title">{detailProject.name}</span>
                            <span className="views"></span>
                            <span className="status">{detailProject.status}</span>
                        </div>
                        <div className="desc-row">
                            招募：
                            {   
                                detailProject.roles.map((item, index)=>
                                    <span className="type" key={index}>{item}&nbsp;</span>
                                )                                
                            }
                        </div>
                        <div className="detail-row clearfix">
                            <div className="detail-span">
                                <span className="name">酬金</span>￥{detailProject.money}
                            </div>
                            <div className="detail-span">
                                <span className="name">类型</span>{detailProject.type}
                            </div>
                            <div className="detail-span">
                                <span className="name">交付截止日期</span>{date.toLocaleDateString()}
                            </div>
                            <Button type="primary" className="apply" onClick={this.apply}>申请</Button>
                        </div>
                    </div>
                    <div className="content-container">
                        <p>一、项目简介</p>
                        <blockquote>
                            <p>{detailProject.introduction}</p>
                        </blockquote>
                        <p>二、需求描述</p>
                        <blockquote>
                            <p>{detailProject.description}</p>
                        </blockquote>
                        <p>三、参考项目</p>
                        <blockquote>
                            <p> 无</p>
                        </blockquote>
                        <p>四、项目规划</p>
                        <blockquote>
                            <p> 无</p>
                        </blockquote>
                        <p>五、相关文件下载</p>
                        <blockquote>
                            <p> 暂无文件</p>
                        </blockquote>
                    </div>
                </div>
                <div className="right">
                    <div className="relative">
                        <div className="title">相关项目</div>
                        {[1,2,3,4,5].map((item)=>
                            <div className="list clearfix" key={item}>
                                <Link to='/' className=''>这里是相关项目项目</Link>
                                <span className='money'>￥ 5000</span>
                            </div>
                        )}
                        <Link to='/' className='more'>more&gt;&gt;</Link>
                    </div>
                    <div className="recommend">
                        <div className="title">推荐项目</div>
                        {[1,2,3,4,5].map((item)=>
                            <div className="list clearfix" key={item}>
                                <Link to='/' className=''>这里是推荐项目项目</Link>
                                <span className='money'>￥ 5000</span>
                            </div>
                        )}
                        <Link to='/' className='more'>more&gt;&gt;</Link>
                    </div>
                </div>
            </div>
        );
    }
}
