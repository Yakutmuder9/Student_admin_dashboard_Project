const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    created_at: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: Object,
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
const Post = mongoose.model('Post', postSchema);

module.exports =  Post;