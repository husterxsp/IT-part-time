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
import {
    Link
} from 'react-router';

import * as projectActions from '../../actions/projectAction';
import './Published.less';

@connect(
    state => ({
        auth: state.auth,
        project: state.project
    }),
    dispatch => ({
        projectActions: bindActionCreators(projectActions, dispatch),
    })
)
export default class Published extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.projectActions.getProjects({
            userID: this.props.auth.user._id
        });
    }
    updateProject(id, status, e) {
        e.preventDefault();
        const value = {
            _id: id,
            status: status
        };
        this.props.projectActions.updateProject(value);
    }
    render() {
        let {
            publishedProject
        } = this.props.project;
        const data = [];
        publishedProject = publishedProject || [];
        for (let i = publishedProject.length - 1; i >= 0; i--) {
            data.push({
                key: publishedProject[i]._id,
                _id: publishedProject[i]._id,
                name: publishedProject[i].name,
                type: publishedProject[i].type,
                status: publishedProject[i].status
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
            title: '查看申请者列表',
            dataIndex: 'lookApplierList',
            render: (text, record) => (<Link to={'/user/applierList/'+record._id}>查看申请者列表</Link>)
        }, {
            title: '更改项目状态',
            dataIndex: 'updateProject',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={this.updateProject.bind(this,record._id,'开发中')}>开发中</a>
                    <span className="ant-divider"></span>
                    <a href="#" onClick={this.updateProject.bind(this,record._id,'开发完成')}>开发完成</a>
                </span>
            )
        }];

        return (
            <div className="published">
                <div className="title">
                已发布项目
                </div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
