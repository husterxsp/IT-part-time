import React from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Radio,
    Button
} from 'antd';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import * as authActions from '../../actions/authAction';
import './Setting.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const CheckboxGroup = Checkbox.Group;

@connect(
    state => ({
        auth: state.auth
    })
)
export default class Setting extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const dispatch = this.props.dispatch;
        this.authActions = bindActionCreators(authActions, dispatch);
    }
    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.authActions.setInfo(Object.assign({}, values, {
                _id: this.props.auth.user._id
            }));
        });
    }

    render() {
        const getFieldProps = this.props.form.getFieldProps;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        };
        const nameProps = getFieldProps('name', {
            initialValue: this.props.auth.user.name,
            rules: [{
                required: true,
                message: '请填写用户名'
            }]
        });
        const phoneProps = getFieldProps('phone', {
            initialValue: this.props.auth.user.phone,
            rules: [{
                required: true,
                message: '请填写手机号'
            }]
        });
        return (
            <Form horizontal form={this.props.form} className="publish">
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                    required
                >
                    <Input autoComplete="off" value={this.props.auth.user.email} disabled/>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="用户名"
                  hasFeedback
                  required
                >
                  <Input {...nameProps} autoComplete="off"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号"
                    hasFeedback
                    required
                >
                    <Input {...phoneProps} autoComplete="off"/>
                </FormItem>
                <FormItem wrapperCol={{span: 18, offset: 6}}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}
export default createForm()(Setting);
