import React from 'react';
import './footer.less';

export default class Footer extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                Copyright &copy; 2016 实训项目
            </div>
        );
    }
}
