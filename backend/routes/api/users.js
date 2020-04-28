const express = require('express');
const router = express.Router();

const requireJwtAuth = require('../../middleware/requireJwtAuth');
const {User} = require('../../models/User');

router.get('/me', requireJwtAuth, (req, res) => {
  const me = req.user.toJSON();
  res.json({ me });
});

router.get('/:username', requireJwtAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'No user found.' });
    res.json({ user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 'desc' });

    res.json({
      users: users.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempUser = await User.findById(req.params.id);
    if (!tempUser) return res.status(404).json({ message: 'No such user.' });
    if (!(tempUser.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privilegies to delete that user.' });


    //delete user
    const user = await User.findByIdAndRemove(tempUser.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;