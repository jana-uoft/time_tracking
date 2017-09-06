import User from '../models/user';


module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  create: async (req, res, next) => {
    const user = await new User(req.value.body).save();
    res.status(201).json(user);
  },

  show: async (req, res, next) => {
    const user = await User.findById(req.value.params.id);
    if (!user)
      res.status(404).json({error: `Object doesn't exist with id ${req.value.params.id}`});
    else
      res.status(200).json(user);
  },

  replace: async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.value.params.id, req.value.body);
    if (!user)
      res.status(404).json({error: `Object doesn't exist with id ${req.value.params.id}`});
    else
      res.status(200).json(user);
  },

  update: async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.value.params.id, req.value.body);
    if (!user)
      res.status(404).json({error: `Object doesn't exist with id ${req.value.params.id}`});
    else
      res.status(200).json(user);
  },

  delete: async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.value.params.id);
    if (!user)
      res.status(404).json({error: `Object doesn't exist with id ${req.value.params.id}`});
    else
      res.status(200).json(user);
  },
}
