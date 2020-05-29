const express = require('express');
const router = express.Router();

const requireJwtAuth = require('../../middleware/requireJwtAuth');
const {Todo} = require('../../models/todo');

/*

/api/todos/

TODO routes
GET
'/' gets all todos user has including todo items
'/:id' get specific todoitem id
'/todoitem/checked/:id'

Post
'/' create new todo entry
'/todo' create a todo list object
'/:todoid/ create new TodoItem'

Put
'/:id' edit todo
'/todoitem/:id' edit todoitem
'/todoitem/checked/:id' edit checked value of todolist item

Delete
'/:id' delete todo
'/todoitem/:id' delete todoitem

*/

/*
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
  */

 '/' gets all todos user has including todo items
router.get('/', requireJwtAuth, async(req, res) => {
  try{
    Todo.find({user: req.user.id}, function(err, todo){
      if(err) return handleError(err);
        res.status(200).json({message: todo});
    });
  } catch(err) {
    res.sendStatus(500).json({message: 'Something went wrong. '})
  }
});
//Create new TODO obj for user
//returns TODO object
router.post('/', requireJwtAuth, async (req, res) => {
  try {
    Todo.create({ user: req.user.id }, function (err, todo) {
      if (err) return handleError(err);
        res.status(200).json({ message: todo });
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});


//creates todolist for users todo obj
//takes title paramater from request
router.post('/todo', requireJwtAuth, async (req, res) => {
  console.log(req.params);
  try{
    const todoList = {
      title: req.body.title
    }
    
    Todo.updateOne(
      { user: req.user.id },
      { $push: { todos: todoList } },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
  
});

 //create new todolist item for the todolist specified in req.params
 //find todoObj by userId, then list by listId then put item in list
router.post('/todo/todolist', requireJwtAuth, async (req, res) => {
  try{
    const todoListId = req.body.todolistid;
    const todoItem = {
      title: req.body.title,
      checked: false,
      duration: req.body.duration
    }
    Todo.findOneAndUpdate(
      { user: req.user.id, 'todos._id': todoListId },
      { $push: { "todos.$.todoitems": todoItem } },
      function(err,doc) {
        if(err){
          res.send(err);
        }else{
          res.send(doc);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
  
});

module.exports = router;