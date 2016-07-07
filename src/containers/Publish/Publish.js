import React from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Radio,
    InputNumber,
    DatePicker,
    Col,
    Button,
    Upload,
    Icon,
    message
} from 'antd';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const CheckboxGroup = Checkbox.Group;

import * as projectActions from '../../actions/projectAction';

import './Publish.less';

@connect(
    state => ({
        auth: state.auth,
        data: state.data
    })
)
export default class Publish extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.state = {
            type: 'Web网站',
            fileList: []
        };
    }
    componentDidMount() {
        const {
            dispatch
        } = this.props;
        this.projectActions = bindActionCreators(projectActions, dispatch);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            var stateValues = {
                roles: this.state.roles,
                type: this.state.type
            }
            if (this.state.fileList.length > 0) {
                stateValues.img = this.state.fileList[0].thumbUrl;
            }
            this.projectActions.publish(Object.assign({}, values, stateValues, {
                userID: this.props.auth.user._id
            }), () => {
                this.props.form.resetFields();
                this.setState({
                    'roles': [],
                    'type': 'Web网站',
                    'fileList': []
                })
            });
        });

    }

    handleCheckbox(value) {
        //这里有点小问题待解决！state的问题
        this.setState({
            'roles': value
        });
    }
    handleSelect(value) {
        this.setState({
            'type': value
        });
    }
    handleUpload(info) {
        let fileList = info.fileList;
        this.setState({ fileList });
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
                message: '请填写项目名称'
            }]
        });
        const introductionProps = getFieldProps('introduction', {
            rules: [{
                required: true,
                message: '请填写项目简介'
            }]
        });
        const descriptionProps = getFieldProps('description', {
            rules: [{
                required: true,
                message: '请填写需求描述'
            }]
        });
        const checkboxOptions = ['前端开发', '后端开发', 'IOS开发', 'Android开发', '产品经理', '开发团队', '设计师']
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
        };
        const uploadProps = {
            action: '//127.0.0.1:3000/api/upload',
            onChange: this.handleUpload,
            beforeUpload: (file) => {
                const isPicture = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isPicture) {
                    message.error('只能上传 JPG/PNG 文件哦！');
                }
                return isPicture;
            }
        };
        return (
            <Form horizontal form={this.props.form} className="publish">
                <FormItem
                    {...formItemLayout}
                    label="项目名称"
                    hasFeedback
                    required
                    help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                >
                    <Input {...nameProps} autoComplete="off"/>
                </FormItem>

                <FormItem
                    label="项目简介"
                    {...formItemLayout}
                    hasFeedback
                    required
                >
                    <Input {...introductionProps} type="textarea" rows="3" />
                </FormItem>
                <FormItem
                    label="需求描述"
                    {...formItemLayout}
                    hasFeedback
                    required
                >
                    <Input {...descriptionProps} type="textarea" rows="3" />
                </FormItem>
                <FormItem label = "项目类型" {...formItemLayout} required>
                    <Select size="large" defaultValue="Web网站" style={{ width: 200 }} onChange={this.handleSelect}>
                        <Option value="Web网站">Web网站</Option>
                        <Option value="移动应用APP">移动应用APP</Option>
                        <Option value="微信开发">微信开发</Option>
                        <Option value="HTML5应用">HTML5应用</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="项目酬金(￥)"
                    {...formItemLayout}
                    required
                >
                    <Input type="number" {...getFieldProps('money') } min={0} max={1000000} style={{ width: 200 }}/>
                </FormItem>

                <FormItem
                    label="项目所需角色"
                    {...formItemLayout}
                    required
                >
                    <CheckboxGroup options={checkboxOptions} onChange={this.handleCheckbox} />
                </FormItem>
                <FormItem
                    label="项目截止日期"
                    {...formItemLayout}
                    required
                >
                    <DatePicker {...getFieldProps('deadline')} />
                </FormItem>
                <FormItem
                    label="图片上传"
                    {...formItemLayout}
                    help="点击上传项目展示图片"
                >
                    <Upload name="logo" listType="picture" {...uploadProps} >
                        <Button type="ghost">
                            <Icon type="upload" /> 点击上传
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem wrapperCol={{ span: 18, offset: 6 }}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

export default createForm()(Publish);
