import ApplyModel from './schema/apply';

const apply = {
    existApply(query) {
        return ApplyModel
            .findOne(query)
            .exec();
    },
    updateApply(query) {
        return ApplyModel
            .update({
                _id: query._id
            }, query)
            .exec();
    },
    async createApply(body) {
        return await new ApplyModel(body).save();
    },
    getApplied(query) {
        return ApplyModel
            .find(query)
            .exec()
    }
};

export default apply;