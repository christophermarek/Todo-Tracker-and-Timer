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

Post
'/' create new todo entry
'/todo' create a todo list object
'/:todoid/ create new TodoItem'

Put
'/:todoid' edit todo
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

//Create an object from the collection grabbed from the db,
//not sure why but when it gets sent to the client without doing this
//it does not return the entire collection and it also brings up parsing errors
//is there a better way to do this?
function createTodoObj(collection){

  //parent object
  let todoObj = {
    user: collection.user,
    date: collection.date,
    todos: [],
  }
  //iterate through each todoList 
  let todosList = [];
  for(let i = 0; i < collection.todos.length; i++){
    let todo = {
      date: collection.todos[i].date,
      _id: collection.todos[i]._id,
      title: collection.todos[i].title,
      todoitems: [],
    };
    //iterate through each todo item for each todo list
    for(let k = 0; k < collection.todos[i].todoitems.length; k++){
      let todoItem = {
        id: collection.todos[i].todoitems[k]._id,
        title: collection.todos[i].todoitems[k].title,
        checked: collection.todos[i].todoitems[k].checked,
        duration: collection.todos[i].todoitems[k].duration,
      };
      //append todoItem to its respictive todolist
      todo.todoitems.push(todoItem);
    }
    //append array of todoLists to todoList array
    todosList.push(todo);
  }
  //append todoLists array to todoObj
  todoObj.todos.push(todosList);
  return todoObj;
}

function createTodoItemObj(todoColl, todosid, itemid){
  let todoItem = {
      id: "",
      title: "",
      checked: "",
      duration: "",
   }
  for(let i = 0; i < todoColl.todos.length; i++){
    if(todoColl.todos[i]._id == todosid ){
      for(let k = 0; k < todoColl.todos[i].todoitems.length; k++){
        if(todoColl.todos[i].todoitems[k]._id == itemid){
          todoItem.id = todoColl.todos[i].todoitems[k]._id;
          todoItem.title = todoColl.todos[i].todoitems[k].title;
          todoItem.checked = todoColl.todos[i].todoitems[k].checked;
          todoItem.duration = todoColl.todos[i].todoitems[k].duration;
        }
      }
    }
  }
  return todoItem;
}

//'/:id' delete todoList
router.delete('/todos/:id', requireJwtAuth, async(req, res) => {
  try{
    //findOneAndDelete removes every collection, since each collection is inside one large collection for that user.
    //have to just delete the list
    todoListId = req.query.todoListId;
    console.log(todoListId);
    let todoColl = await Todo.findOne({ user: req.user.id, 'todos._id': todoListId });
    for(let i = 0; i < todoColl.todos.length; i++){
      if(todoColl.todos[i]._id == todoListId ){
        todoColl.todos.splice(i, 1);  
      }
    }
    await todoColl.save();
    res.send(createTodoObj(todoColl));
    
  }catch(err){
    res.status(500).json({message: 'Something went wrong'});
  }
});

// '/todoitem/:id' delete todoitem
router.delete('/todos/todoitem/:id', requireJwtAuth, async(req, res) => {
  try{
    todoListId = req.query.todoListId;
    itemId = req.query.todoItemId;
    let todoColl = await Todo.findOne({ user: req.user.id, 'todos._id': todoListId });
    for(let i = 0; i < todoColl.todos.length; i++){
      if(todoColl.todos[i]._id == todoListId ){
        for(let k = 0; k < todoColl.todos[i].todoitems.length; k++){
          if(todoColl.todos[i].todoitems[k]._id == itemId){
            todoColl.todos[i].todoitems.splice(k, 1);
          }
        }
      }
    }
    await todoColl.save();
    res.status(200).json({message: 'Delete successful'});
    
  }catch(err){
    res.status(500).json({message: 'Something went wrong'});
  }
});

//'/todoitem/:id' edit todoitem
router.put('/todos/todo/todoitem/checked/:id', requireJwtAuth, async(req, res) => {
  try{
    todoListId = req.query.todoListId;
    itemId = req.query.todoItemId;
    let todoColl = await Todo.findOne({ user: req.user.id, 'todos._id': todoListId });
    for(let i = 0; i < todoColl.todos.length; i++){
      if(todoColl.todos[i]._id == todoListId ){
        for(let k = 0; k < todoColl.todos[i].todoitems.length; k++){
          if(todoColl.todos[i].todoitems[k]._id == itemId){
            todoColl.todos[i].todoitems[k].checked = req.body.checked;
          }
        }
      }
    }
    await todoColl.save();
    res.status(200).json({message: 'Update successful'});
  } catch(err){
    res.status(500).json({message: 'Something went wrong'});
  }
  
});

//'/todoitem/:id' edit todoitem
router.put('/todos/todo/todoitem/:id', requireJwtAuth, async(req, res) => {
  try{
    todoListId = req.query.todoListId;
    itemId = req.query.todoItemId;
    let todoColl = await Todo.findOne({ user: req.user.id, 'todos._id': todoListId });
    for(let i = 0; i < todoColl.todos.length; i++){
      if(todoColl.todos[i]._id == todoListId ){
        for(let k = 0; k < todoColl.todos[i].todoitems.length; k++){
          if(todoColl.todos[i].todoitems[k]._id == itemId){
            todoColl.todos[i].todoitems[k].duration = req.body.duration;
            todoColl.todos[i].todoitems[k].title = req.body.title;
            todoColl.todos[i].todoitems[k].checked = req.body.checked;
          }
        }
      }
    }
    await todoColl.save();
    res.status(200).json({message: 'Update successful'});
  } catch(err){
    res.status(500).json({message: 'Something went wrong'});
  }
  
});
//'/:todoid' edit todo
//only the title field is editable
router.put('/todos/:id', requireJwtAuth, async(req, res) => {
  const todoListId = req.query.todoListId;
  const title = req.query.title;

  try{
    Todo.findOneAndUpdate(
      { user: req.user.id, 'todos._id': todoListId },
      { $set: { "todos.$.title":title } },
      function(err,doc) {
        if(err){
          res.send(err);
        }else{
          res.send(doc);
        }
      }
    );
  } catch(err){
    res.status(500).json({message: 'Something went wrong'});
  }

});

//gets user id and returns users full todoObj
router.get('/', requireJwtAuth, async(req, res) => {
  try{
    const todoCollection = await Todo.findOne({user: req.user.id});
    let response = createTodoObj(todoCollection);
    res.send(response);

  } catch (err){
    res.status(500).json({message: 'Something went wrong'});
  }

});

//'/:id' get specific todoitem id
router.get('/todoitem/:id', requireJwtAuth, async(req, res) => {
  try{
    const itemid = req.query.itemid;
    const todosid = req.query.todosid;
    let todoColl = await Todo.findOne({ user: req.user.id});
    let todoItem = createTodoItemObj(todoColl, todosid, itemid);
    res.send(todoItem);
  } catch(err){
    res.status(500).json({message: 'Something went wrong'});
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
  try{
    const todoList = {
      title: req.body.title
    }
    
    Todo.findOneAndUpdate(
      { user: req.user.id },
      { $push: { todos: todoList } },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          //sends whole collection
          res.send(createTodoObj(result));
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
      function(err, doc) {
        if(err){
          res.send(err);
        }else{
          res.send(createTodoObj(doc));
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
  
});

module.exports = router;