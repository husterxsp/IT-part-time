import mongoose from 'mongoose';

export default async() => new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/IT-part-time', (error) => {
        if (error) {
            reject(error.message);
        }
        resolve();
    });
});