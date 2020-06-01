const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const categorySchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    categories: [{
        title: String,
        date: { type: Date, default: Date.now },
        duration: Number,
        //figure out how to link todoId like how we linked userID
        todoitem: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }
    }] 
});

//https://stackoverflow.com/questions/54516428/update-nested-subdocument-in-mongoose
//use this answer to build categories this way, maybe refractor todos later

const Category = mongoose.model('Category', categorySchema);
module.exports = {
    Category
};