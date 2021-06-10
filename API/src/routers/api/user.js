const router = require('express').Router();
const User = require('../../models/user');
const { body, param, validationResult } = require('express-validator');
const isEmptyObject = require('../../utils/isEmptyObject');
const authByRole = require('../../middleware/auth-by-role');
const auth = require('../../middleware/auth');
const { createNotification, registerNotification, unregisterNotification } = require('../../utils/notification');
const createProfile = require('../../utils/profile');
const { sendEmail } = require('../../utils/email');

// @route Post api/users/register
// @desc Registry user
// @access Public
router.post('/register', [
  body('fullname', 'Full Name is required').not().isEmpty(),
  body('email', 'Email is required').not().isEmpty(),
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Please enter a password with 6 or more character').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, username, password, email, gender = 'm', country = '' } = req.body;

  try {
    //Check user is exists.
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User is already exists.' })
    }

    user = new User({
      fullname,
      email,
      gender,
      country,
      username,
      password
    })

    await user.save();

    const token = await user.generateAuthToken();

    // Create two collections about profile and notification.
    await Promise.all([createNotification(user), createProfile(user), sendEmail(user)]);

    res.json({ token });
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is error.');
  }
});

// @route Get api/users/search
// @desc Search user by name
// @access public
router.get('/search', async (req, res) => {
  try {
    // Limit user with 5 posts and if not skip then default value is 0.
    const limit = parseInt(req.query.limit) || 5;
    const skip = parseInt(req.query.skip) || 0;

    // Get name to search
    const name = req.query.name;

    // if (!name) {
    //   return res.status(400).json({ msg: 'Name is required.' });
    // }

    // Create conditions with role active user and case sentive name.
    const conditions = {
      role: 'user',
      status: 1
    };

    if (name) {
      conditions.fullname = { '$regex': name, $options: 'i' };
    }

    const users = await User.find(conditions)
      .limit(limit).skip(skip);

    res.json(users);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route GET /api/users/send-mail-welcome
// @desc Test send mail
// @access private
router.get('/send-mail-welcome', auth, async (req, res) => {
  try {
    await sendEmail(req.user);
    res.send('Send email ok');
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is error.');
  }
});

// @route PUT /api/users/changepassword
// @desc Change current user's password
// @access private
router.put('/changepassword', auth, [
  body('currentPassword').not().isEmpty(),
  body('newPassword').not().isEmpty(),
  body('verifyPassword').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user;

    const { currentPassword, newPassword, verifyPassword } = req.body;

    if (newPassword !== verifyPassword) {
      return res.status(400).json({ msg: 'Password is not match. ' });
    }

    const isMatch = await User.comparePassword(user.id, currentPassword);

    if (isMatch) {
      user.password = currentPassword;
      await user.save();
      return res.json({ msg: 'Password changes sucessfully !' });
    }

    return res.status(400).json({ msg: 'Password is not match.' });
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is error.');
  }
});


//CRUD Users
// Get - Return the list users has role user
router.get('/', authByRole('admin'), async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
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
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send('userId is required.');
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User is not exists");
    }

    user.status = 0;  // delete status

    await user.save();

    res.send({ "result": "remove successfuly", user });
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route Post api/users/register
// @desc Look user
// @access private - admin
router.put('/look/:user_id', authByRole('admin'), async (req, res) => {
  try {
    const id = req.params.user_id;

    if (!id) {
      return res.status(400).send('userId is required.');
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User is not exists");
    }

    user.status = 2;  // Change to look user status.

    await user.save();

    res.send(user);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route Post api/users/unlook
// @desc Look user
// @access private - admin
router.put('/unlook/:user_id', authByRole('admin'), async (req, res) => {
  try {
    const id = req.params.user_id;

    if (!id) {
      return res.status(400).send('userId is required.');
    }

    const user = await User.findById(id);
    user.status = 1;  // Change to unlook user status.

    await user.save();

    res.send(user);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route PUT api/users/following/:user_id
// @desc Following User.
// @access private
router.put('/following/:user_id', auth, async (req, res) => {
  try {
    const id = req.params.user_id;

    if (!id) {
      return res.status(400).send('userId is required.');
    }

    const user = await User.findById(id);

    await registerNotification(req.user, user, 'FRIEND');

    res.send(user);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route PUT api/users/unfollowing/:user_id
// @desc Following User.
// @access private
router.put('/unfollowing/:user_id', auth, async (req, res) => {
  try {
    const id = req.params.user_id;

    if (!id) {
      return res.status(400).send('userId is required.');
    }

    const user = await User.findById(id);

    await unregisterNotification(req.user, user, 'FRIEND');

    res.send(user);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route GET api/users/admin/collaborators
// @desc GET role' user is collaborator
// @access private - admin
router.get('/admin/collaborators', authByRole('admin'), async (req, res) => {
  try {
    const users = await User.find({ role: 'collaborator' });

    res.json(users);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route PATCH api/users/collaborator
// @desc Add users to become collaborator
// @access private - admin
router.patch('/admin/collaborators', authByRole('admin'), [
  body('users', 'User list has required.').isArray()
], async (req, res) => {
  try {
    // 1. Validation req.body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    // 2. Update User to collaborator role
    const users = await User.updateMany({
      _id: { $in: req.body.users }
    }, {
      role: 'collaborator'
    });

    //3. Response client
    res.json(users);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

// @route PATCH api/users/:id/collaborator/remove
// @desc Remove collaborator to become user.
// @access private - admin
router.patch('/:id/admin/collaborators/remove', authByRole('admin'), [
  param('id', 'User Id has required.').not().isEmpty()
], async (req, res) => {
  try {

    const id = req.params.id;

    // 1. Validation req.body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    // 2. Update User to collaborator role
    const user = await User.findByIdAndUpdate(id, { role: 'user' });

    //3. Response client
    res.json(user);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Server is errors.');
  }
});

module.exports = router;