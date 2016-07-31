import React from 'react';
import {
    Link
}
from 'react-router';
import './ShowList.less';
import '../../static/font/css/fontello.css';

export default class ShowList extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        // 改变UI的临时state
        this.state = {
            listNum: 9
        };
    }
    showMore() {
        let listNum = this.state.listNum + 9;
        if (listNum < this.props.projects.length) {
            listNum = this.props.projects.length;
        }
        this.setState({
            listNum
        });
    }
    render() {
        const {
            projects,
            filter
        } = this.props;
        let list = 0;

        let listComps = projects.map(item => {
            if (filter.type !== '所有类型' && filter.type !== item.type) {
                return;
            }
            if (filter.role !== '所有角色' && item.roles.indexOf(filter.role) === -1) {
                return;
            }
            if (item.status === '已删除') {
                return false;
            }
            if (list === this.state.listNum) {
                return false;
            }
            list++;
            let imgUrl = require(`../../static/img/project/${(parseInt(item._id, 16) % 10 + 1)}.png`);
            return (
                <div className='list-item' key={item._id}>
                    <Link to={'/project/' + item._id} className='img'
                        style={{backgroundImage: item.img ? `url(${item.img})` : `url(${imgUrl})`}}>
                        <div className="introduction"><p>{item.introduction}</p></div>
                    </Link>
                    <div className="list-content">
                        <div className="name">{item.name}</div>
                        <div className="money"><span style={{color: '#c7c7c7'}}>￥</span>{item.money}</div>
                        <div className="deadline">交付时间: {(new Date(item.deadline)).toLocaleDateString()}</div>
                        <div className="roles-icons">
                            <div className="roles">
                                {
                                    item.roles.map((role, index) =>
                                        <span className="type" key={index}>{role}&nbsp;</span>
                                    )
                                }
                            </div>
                            <div className="icons">
                                <span><i className="icon-eye"></i>{item.views}</span>
                                <span><i className="icon-comment"></i>0</span>
                            </div>
                        </div>

                    </div>
                </div>
            );
        });
        listComps = listComps.filter(item => item !== false);
        return (
            <div className='show-list clearfix'>
                {
                    (() => {
                        if (listComps.length) {
                            return listComps;
                        }
                        return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
                    })()
                }
                <div className="show-more">
                {
                    (() => {
                        if (listComps.length === projects.length) {
                            return <div>已经没有了</div>;
                        }
                        return (<div onClick={this.showMore}>显示更多</div>);
                    })()
                }
                </div>
            </div>
        );
    }
}
