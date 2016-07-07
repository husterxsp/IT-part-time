import UserModel from './schema/user';

const User = {
    getAuth(email) {
        const query = {
            email: email
        };
        return UserModel
            .findOne(query)
            .exec();
    },
    getInfo(query) {
        return UserModel
            .findOne(query, {
                password: 0
            })
            .exec();
    },
    updateInfo(query) {
        return UserModel
            .update({
                _id: query._id
            }, query)
            .exec();
    },

    async createUser(body) {
        return await new UserModel(body).save();
    },
};

export default User;