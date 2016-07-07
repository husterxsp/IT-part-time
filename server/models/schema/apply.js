import mongoose, {
    Schema
} from 'mongoose';

var ApplySchema = new Schema({
    userID: String,
    userName: String,
    userPhone: String,
    projectID: String,
    projectName: String,
    projectType: String,
    publisherID: String,
    comment2applier: {
        type: Number,
        default: 0
    },
    comment2publisher: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: '申请中'
    }
});

export default mongoose.model('Apply', ApplySchema);
