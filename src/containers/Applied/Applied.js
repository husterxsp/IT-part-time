import React from 'react';
import {
    Table,
    Icon,
    pagination,
    Modal,
    Rate
} from 'antd';

import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';

import * as projectActions from '../../actions/projectAction';
import './Applied.less';

const confirm = Modal.confirm;

@connect(
    state => ({
        auth: state.auth,
        project: state.project
    }),
    dispatch => ({
        projectActions: bindActionCreators(projectActions, dispatch),
    })
)
export default class Applied extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.projectActions.getAppliedProjects({
            userID: this.props.auth.user._id
        });
    }
    handleComment(id, userID, publisherID, value) {
        const query = {
            _id: id,
            comment2publisher: value,
            userID: userID,
            publisherID: publisherID,
            projectID: this.props.params._id
        };
        this.props.projectActions.updateApplierList(query);
    }
    render() {
        let {
            applyList
        } = this.props.project;
        let data = [];
        applyList = applyList || [];

        for (let i = applyList.length - 1; i >= 0; i--) {
            data.push({
                key: applyList[i]._id,
                _id: applyList[i]._id,
                userID: applyList[i].userID,
                publisherID: applyList[i].publisherID,
                projectName: applyList[i].projectName,
                projectType: applyList[i].projectType,
                status: applyList[i].status,
                comment: applyList[i].comment2publisher
            });
        }
        let pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {},
            onChange(current) {},
        };
        let columns = [{
            title: '项目名',
            dataIndex: 'projectName',
            key: 'projectName'
        }, {
            title: '项目类型',
            dataIndex: 'projectType',
            key: 'projectType',
        }, {
            title: '申请状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '评价项目发布者',
            'dataIndex': 'comment',
            render: (text, record) => (<Rate onChange={this.handleComment.bind(this, record._id,record.userID, record.publisherID)} value={record.comment} />)
        }];
        return (
            <div className="applied">
                <div className="title">
                已申请项目
                </div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
