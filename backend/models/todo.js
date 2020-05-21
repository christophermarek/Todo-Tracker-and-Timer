const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    todos: [{
        title: String,
        date: { type: Date, default: Date.now },
        todoitems: [{
            title: String,
            checked: false,
            duration: Number,
            todoitem: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }
        }],
    }] 
});


const Todo = mongoose.model('Todo', TodoSchema);
module.exports = {
    Todo
};