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
'/' create new todo
'/:id create new TodoItem'

Put
'/:id' edit todo
'/todoitem/:id' edit todoitem
'/todoitem/checked/:id' edit checked value of todolist item

Delete
'/:id' delete todo
'/todoitem/:id' delete todoitem

*/

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 'desc' }).populate('user');

    res.json({
      messages: messages.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('user');
    if (!message) return res.status(404).json({ message: 'No message found.' });
    res.json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let message = await Message.create({
      text: req.body.text,
      user: req.user.id,
    });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

//Create new TODO
router.post('/', requireJwtAuth, async (req, res) => {

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

  try {
    let Todo = await Todo.create({
      title: req.body.title,
      user: req.user.id,
    });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempMessage = await Message.findById(req.params.id).populate('user');
    if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'Not the message owner or admin.' });

    const message = await Message.findByIdAndRemove(req.params.id).populate('user');
    if (!message) return res.status(404).json({ message: 'No message found.' });
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const tempMessage = await Message.findById(req.params.id).populate('user');
    if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'Not the message owner or admin.' });

    let message = await Message.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text, user: tempMessage.user.id },
      { new: true },
    );
    if (!message) return res.status(404).json({ message: 'No message found.' });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;