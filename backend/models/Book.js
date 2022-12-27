const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
const Book = mongoose.model('Book', bookSchema);

module.exports =  Book;