import React from 'react';

export default class About extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>这里是关于页面，2016.6暑假实训项目</div>
        );
    }
}
