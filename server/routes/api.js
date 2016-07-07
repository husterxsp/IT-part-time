import db from '../models/index';
import moment from 'moment';
import webtoken from 'jsonwebtoken';

const {
    Project,
    User,
    Apply
} = db;

export default function (Router) {
    const router = new Router({
        prefix: '/api'
    });

    router.post('/upload', async function () {
        this.body = {
            response: '上传文件'
        };
    });
    router.get('/projects', async function () {
        const {
            admin,
            userID
        } = this.query;
        let project = [];
        let publishedProject = [];
        if (admin) {
            //管理员可查看所有
            project = await Project.getProjects();
        } else if (userID) {
            //用户查看自己已发布
            let publishedProject = await Project.getProjects({
                userID: userID
            });
            this.body = {
                publishedProject: publishedProject,
                success: '成功获取已发布的项目列表'
            };
            return;
        } else {
            //首页显示已通过
            project = await Project.getProjects({
                status: '审核通过'
            });
        }


        this.body = {
            project: project,
            success: '成功获取项目列表'
        };
    });

    router.post('/projects', async function () {
        const body = this.request.body;
        const newProject = await Project.createProject(body);
        this.body = {
            success: '项目已成功发布，请等待管理员审核',
            project: newProject
        };
    });

    router.get('/project/:_id', async function () {
        const {
            _id
        } = this.params;

        const project = await Project.getProject(_id);
        if (!project) {
            this.body = {
                message: 'project not found'
            };
            return;
        }
        // 增加浏览次数
        project.views++;
        try {
            const body = {
                project: project,
                success: '获取详细项目信息'
            };
            this.body = body;
            project.save();
        } catch (e) {
            this.status = 403;
            this.body = 'err';
        }
    });
    router.delete('/project/:_id', async function () {
        const {
            _id
        } = this.params;
        const project = await Project.deleteProject(_id);
        console.log(project.result);

        this.body = {
            _id: _id,
            success: '成功删除项目'
        };
    });
    router.put('/project/:_id', async function () {
        const {
            _id
        } = this.params;
        const body = this.request.body;
        const result = await Project.updateProject(body);
        const project = await Project.getProject(_id);
        this.body = {
            project: project,
            success: '成功更新项目状态'
        };
    });
    router.post('/apply', async function () {
        const body = this.request.body;

        const exist = await Apply.existApply(body);
        if (exist) {
            this.body = {
                error: '请勿重复申请！'
            };
            this.status = 401;
            return;
        }
        const newApply = await Apply.createApply(body);
        this.body = {
            success: '已成功申请'
        };
    });
    router.put('/apply', async function () {
        const body = this.request.body;
        const result = await Apply.updateApply(body);

        let applyList;
        if (body.comment2publisher) {
            let userInfo = await User.getInfo({
                _id: body.publisherID
            })
            let level = userInfo.level + body.comment2publisher;
            userInfo = await User.updateInfo({
                _id: body.publisherID,
                level: level
            })
            applyList = await Apply.getApplied({
                userID: body.userID
            })
        } else if (body.comment2applier) {
            let userInfo = await User.getInfo({
                _id: body.userID
            })
            let level = userInfo.level + body.comment2applier;
            userInfo = await User.updateInfo({
                _id: body.userID,
                level: level
            });
            applyList = await Apply.getApplied({
                projectID: body.projectID
            })
        } else {
            applyList = await Apply.getApplied({
                projectID: body.projectID
            });
        }

        this.body = {
            applyList: applyList,
            success: '成功更新项目申请者列表'
        };
    });
    router.get('/apply', async function () {
        const {
            userID,
            projectID
        } = this.query;
        if (userID) {
            const applyList = await Apply.getApplied({
                userID: userID
            });
            this.body = {
                applyList: applyList,
                success: '成功获取申请项目列表'
            };
        } else {
            const applyList = await Apply.getApplied({
                projectID: projectID
            });
            this.body = {
                applyList: applyList,
                success: '成功获取项目申请者列表'
            };
        }

    });

    router.post('/login', async function () {
        let body = this.request.body;
        let {
            email,
            password
        } = body;

        let authInfo = await User.getAuth(email);

        if (!authInfo) {
            this.body = {
                error: '账号不存在'
            };
            this.status = 401;
            return;
        }
        if (password !== authInfo.password) {
            this.body = {
                error: '密码错误'
            };
            this.status = 401;
            return;
        }

        // this.set('Access-Control-Allow-Credentials', true);
        // this.cookies.set('userInfo', '1111', {
        //     httpOnly: false,
        //     domain: '127.0.0.1',
        // });
        let userInfo = await User.getInfo({
            email: email
        });
        let playload = {
            user: userInfo
        };
        let expires = moment().add(7, 'days').valueOf();
        let token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
        });
        this.body = {
            token,
            success: '登陆成功',
        };
    });

    router.post('/register', async function () {

        const body = this.request.body;
        const {
            email
        } = body;
        const authInfo = await User.getAuth(email);
        if (authInfo) {
            this.body = {
                error: '该邮箱已注册'
            };
            this.status = 401;
            return;
        }
        const newUser = await User.createUser(body);
        this.body = {
            success: '注册成功'
        };

    });


    router.get('/valid', async function () {
        const accessToken = this.headers['x-access-token'];
        const token = accessToken;
        const decoded = webtoken.verify(token, 'keys');
        if (decoded.exp <= Date.now()) {
            this.body = {
                error: '登录状态已过期，请重新登录'
            };
            return;
        }
        if (decoded) {
            this.body = {
                token,
                error: '',
                success: '登陆成功'
            };
            return;
        }
    });

    router.post('/setting', async function () {
        const body = this.request.body;
        const updateInfo = await User.updateInfo(body);
        const userInfo = await User.getInfo({
            _id: body._id
        });
        const playload = {
            user: userInfo
        };
        const expires = moment().add(7, 'days').valueOf();
        const token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
        });
        this.body = {
            token,
            success: '修改信息成功'
        };
    });

    return router.routes();
}
