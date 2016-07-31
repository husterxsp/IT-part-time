import React from 'react';
import {
    Button,
    Form,
    Input
}
from 'antd';
import {
    connect
}
from 'react-redux';
import {
    bindActionCreators
}
from 'redux';
import * as authActions from '../../actions/authAction';
import './login.less';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}
@connect(
    state => {
        return ({
            auth: state.auth
        });
    }
)
class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const dispatch = this.props.dispatch;
        this.authActions = bindActionCreators(authActions, dispatch);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }
            this.authActions.login(values, () => {
                this.context.router.push('/');
            });
        });
    }
    render() {
        const {
            getFieldProps,
            getFieldError
        } = this.props.form;
        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [{
                    required: true
                }],
                trigger: 'onBlur'
            }, {
                rules: [{
                    type: 'email',
                    message: '请输入正确的邮箱地址'
                }],
                trigger: ['onBlur', 'onChange']
            }]
        });
        const passwdProps = getFieldProps('password', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请填写密码'
            }, {
                validator: true
            }]
        });
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            }
        };
        return (
            <Form horizontal form={this.props.form} className="register">
                <div className="title">账号登录</div>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                >
                    <Input {...emailProps} type="email" autoComplete="off"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    <Input {...passwdProps} type="password" autoComplete="off"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>
                <FormItem wrapperCol={{span: 12, offset: 7}}>
                    <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                </FormItem>
            </Form>
        );
    }
}
export default createForm()(Login);
