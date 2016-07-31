import React from 'react';
import {
    Button,
    Form,
    Input,
    Col,
    Row,
    message
} from 'antd';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import * as authActions from '../../actions/authAction';

import './register.less';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

@connect(
    state => ({
        auth: state.auth
    })
)
class Register extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    }
    static contextTypes = {
        // router: React.PropTypes.func.isRequired
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.checkPass2 = this.checkPass2.bind(this);
    }
    componentDidMount() {
        const {
            dispatch
        } = this.props;
        this.authActions = bindActionCreators(authActions, dispatch);
    }
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.authActions.register(values, () => {
                this.context.router.push('/auth/login');
            });
        });
    }
    checkPass(rule, value, callback) {
        const {
            validateFields
        } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], {
                force: true
            });
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const {
            getFieldValue
        } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    render() {
        const {
            getFieldProps,
            getFieldError,
            isFieldValidating
        } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [{
                required: true,
                min: 5,
                message: '用户名至少为 5 个字符'
            }]
        });
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
                trigger: ['onBlur', 'onChange'],
            }]
        });
        const passwdProps = getFieldProps('password', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请填写密码'
            }, {
                validator: this.checkPass
            }],
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2,
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
                <div className="title">账号注册</div>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                    help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                >
                    <Input {...nameProps} autoComplete="off"/>
                </FormItem>

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
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                >
                    <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="ghost" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default createForm({})(Register);
