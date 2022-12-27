const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    created_at: Date,
    user: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: {},
    },
    fileData: String,
    fileName: String,
    fileType: String,
    like: [
        {
            username: String
        }
    ],
    share: [
        {
            username: String
        }
    ],
    comments: [
        {
            username: String,
            message: String

        }
    ]
},
    {
        timestamps: true,
    }
);

//Compile
const Course = mongoose.model('Course', courseSchema);

module.exports =  Course;