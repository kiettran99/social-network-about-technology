const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create a Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    trim: true,
    default: 'customer'
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//Create a method in instance generate a token.
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const payload = {
    _id: user._id.toString(),
    role: user.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
}

//Register function findByCredentals
userSchema.statics.findByCredentals = async (username, password) => {

  const user = await User.findOne({ username });

  if (!user) {
    // throw new Error('Unable to login');
    return undefined;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('username or password is not match.');
  }

  return user;
}

//Custom pre save to hash password
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
