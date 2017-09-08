import JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import User from '../models/userModel';


const getToken = user => {
  return JWT.sign({
    iss: 'NodeAPI',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate()+1)
  }, JWT_SECRET);
}

module.exports = {
  regsiter: async (req, res, next) => {
    const { email, password, passwordConfirmation } = req.value.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(403).json({error: `User already exists with email ${email}`});
    if (password !== passwordConfirmation)
      return res.status(403).json({error: `Password and PasswordConfirmation do not match`});
    const user = await new User({ email, password }).save();
    const token = getToken(user);
    res.status(201).json({user, token});
  },

  login: async (req, res, next) => {
    const { user } = req;
    const token = getToken(user);
    res.status(201).json({user, token});
  },

  delete: async (req, res, next) => {
    const { user } = req;
    await user.remove();
    res.status(200).json(user);
  },
}
