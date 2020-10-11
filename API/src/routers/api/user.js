const router = require('express').Router();
const User = require('../../models/user');
const { body, validationResult } = require('express-validator');
const isEmptyObject = require('../../utils/isEmptyObject');
const authByRole = require('../../middleware/auth-by-role');
const { createNotification } = require('../../utils/notification');

// @route Post api/users/register
// @desc Registry user
// @access Public
router.post('/register', [
  body('name', 'Name is required').not().isEmpty(),
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Please enter a password with 6 or more character').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, username, password } = req.body;

  try {
    //Check user is exists.
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User is already exists.'})
    }

    user = new User({
      name,
      username,
      password
    })

    await user.save();

    const token = await user.generateAuthToken();

    createNotification(user);

    res.json({ token });
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is error.');
  }
});


//CRUD Users
// Get - Return the list users
router.get('/', authByRole('admin'), async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  }
  catch (e) {
    console.log(e);
  }
});

router.get('/:id', authByRole('admin'), async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    res.send(user);
  }
  catch (e) {
    console.log(e);
  }
});

router.post('/', authByRole('admin'), async (req, res) => {
  try {
    const newUser = req.body;
    const isEmpty = isEmptyObject(newUser);

    if (isEmpty) {
      res.status(400).send("User not found");
    }

    const user = new User(newUser);

    await user.save();

    res.send(user);
  }
  catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.put('/:id', authByRole('admin'), async (req, res) => {
  try {
    //Validate a params and body of request.
    const id = req.params.id;
    const userUpdate = req.body;

    if (!id || isEmptyObject(userUpdate)) {
      return res.status(400).send("Please provide id or user.");
    }

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).send("User is not exists.");
    }

    //Validate a object
    const updates = Object.keys(userUpdate);
    const allowUpdates = ['name', 'username', 'password', 'role'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid update !" });
    }

    updates.forEach(update => currentUser[update] = userUpdate[update]);

    await currentUser.save();

    return res.send(currentUser);
  }
  catch (e) {
    console.log(e);
  }
});

router.delete('/:id', authByRole('admin'), async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send("Please provide Id.");
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send("User is not exists");
  }

  res.send({ "result": "remove successfuly", user });
});

module.exports = router;