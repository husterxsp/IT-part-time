import mongoose, {
    Schema
} from 'mongoose';

var ProjectSchema = new Schema({
    name: String,
    img: String,
    type: String,
    roles: Array,
    money: Number,
    userID: String,
    deadline: Date,
    introduction: String,
    description: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: '待审核'
    },
    views: {
        type: Number,
        default: 0
    },
});

export default mongoose.model('Project', ProjectSchema);
