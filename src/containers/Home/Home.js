import React from 'react';

import {
    Select,
    Carousel
} from 'antd';
import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as projectActions from '../../actions/projectAction';
import './home.less';
import ShowList from '../../components/ShowList/ShowList.js';

const Option = Select.Option;

@connect(
    state => {
        return ({
            projects: state.project.projects
        });
    },
    dispatch => {
        return ({
            projectActions: bindActionCreators(projectActions, dispatch)
        });
    }
)
export default class Home extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.handleTypeClick = this.handleTypeClick.bind(this);
        this.handleRoleClick = this.handleRoleClick.bind(this);
        this.state = {
            type: '所有类型',
            role: '所有角色'
        };
    }
    componentDidMount() {
        this.props.projectActions.getProjects();
    }

    handleTypeClick(value) {
        this.setState({
            type: value
        });
    }
    handleRoleClick(value) {
        this.setState({
            role: value
        });
    }
    render() {
        const projects = this.props.projects || [];
        const settings = {
            dots: true,
            infinite: true,
            speed: 500
        };
        return (
            <div className="home">
                <Carousel className="banner" effect="fade" autoplay {...settings}>
                    <div><img className="message" src={require('../../static/img/message.png')}/></div>
                    <div><img className="design" src={require('../../static/img/design.png')}/></div>
                    <div><img className="join" src={require('../../static/img/join.png')}/></div>
                    <div><img className="no1" src={require('../../static/img/no1.png')}/></div>
                </Carousel>
                <div className="filter">
                    <Select defaultValue="所有类型" style={{width: 120}} onChange={this.handleTypeClick}>
                        <Option value="所有类型">所有类型</Option>
                        <Option value="Web网站">Web网站</Option>
                        <Option value="移动应用APP">移动应用APP</Option>
                        <Option value="微信开发">微信开发</Option>
                        <Option value="HTML5应用">HTML5应用</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                    <Select defaultValue="所有角色" style={{width: 120}} onChange={this.handleRoleClick}>
                        <Option value="所有角色">所有角色</Option>
                        <Option value="前端开发">前端开发</Option>
                        <Option value="后端开发">后端开发</Option>
                        <Option value="IOS开发">IOS开发</Option>
                        <Option value="Android开发">Android开发</Option>
                        <Option value="产品经理">产品经理</Option>
                        <Option value="设计师">设计师</Option>
                        <Option value="开发团队">开发团队</Option>
                    </Select>
                </div>
                {
                    (() => {
                        if (projects.length) {
                            return <ShowList projects={projects} filter={this.state}/>;
                        }
                        return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
                    })()
                }
            </div>
        );
    }
}
