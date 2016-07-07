import React from 'react';
import {
    Table,
    Icon,
    pagination,
    Modal
} from 'antd';
const confirm = Modal.confirm;

import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';

import * as projectActions from '../../actions/projectAction';

import './Admin.less';

@connect(
    state => ({
        project: state.project,
        auth: state.auth
    }),
    dispatch => ({
        projectActions: bindActionCreators(projectActions, dispatch),
    })
)
export default class Admin extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //这里有点问题，获取项目列表和获取用户信息是两个请求，所以无法在，下面这个请求里加入用户信息
        this.props.projectActions.getProjects({
            admin: 1
        });
    }
    deleteProject(id, e) {
        e.preventDefault();
        const _this = this;
        confirm({
            title: '是否确认要删除这项内容',
            onOk() {
                return new Promise((resolve) => {
                    setTimeout(resolve, 0);
                    _this.props.projectActions.deleteProject(id);
                });
            },
            onCancel() {},
        });
    }
    updateProject(id, status, e) {
        e.preventDefault();
        const value = {
            _id: id,
            status: status
        }
        this.props.projectActions.updateProject(value);
    }
    render() {
        const {
            projects
        } = this.props.project;
        const data = [];
        for (let i = projects.length - 1; i >= 0; i--) {
            data.push({
                key: projects[i]._id,
                _id: projects[i]._id,
                name: projects[i].name,
                type: projects[i].type,
                status: projects[i].status
            });
        }
        const pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            },
        };
        const columns = [{
            title: '项目名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '项目类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                  <a href="#" onClick={this.updateProject.bind(this,record._id,'审核通过')}>审核通过</a>
                  <span className="ant-divider"></span>
                  <a href="#" onClick={this.updateProject.bind(this,record._id,'审核不通过')}>不通过</a>
                  <span className="ant-divider"></span>
                  <a href="#" onClick={this.deleteProject.bind(this,record._id)}>删除</a>
                </span>
            ),
        }];
        return (
            <div className="admin">
                <div className="title">
                管理员界面
                </div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
