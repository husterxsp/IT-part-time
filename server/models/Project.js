import ProjectModel from './schema/project';

const Project = {
    //获取所有项目
    getProjects(query) {
        return ProjectModel
            .find(query)
            .exec();
    },
    //获取单个项目信息
    getProject(id) {
        const query = {
            _id: id
        };
        return ProjectModel
            .findOne(query)
            .exec();
    },
    deleteProject(id) {
        const query = {
            _id: id
        };
        return ProjectModel
            .update(query, {
                $set: {
                    isDeleted: true,
                    status: '已删除'
                }
            })
            .exec();
    },
    updateProject(query) {
        return ProjectModel
            .update({
                _id: query._id
            }, query)
            .exec();
    },
    async createProject(body) {
        return await new ProjectModel(body).save();
    },
};

export default Project;