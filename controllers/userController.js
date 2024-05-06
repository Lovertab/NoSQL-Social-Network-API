const { get } = require('mongoose');
const { User,Thoughts } = require('../models');
 const getUser= async (req, res)=> {
     try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
 }
const getSingleUser = async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.userId }).populate('thoughts');
        if (!users) {
            return res.status(404).json({ message: 'No user found with this ID' });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
     }
}
const createUser = async (req, res) => {
      try {
            const users = await User.create(req.body);
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
}
const deleteUser = async (req, res) => {
      try {
      const users = await User.findOneAndDelete({ _id: req.params.userId });

      if (!users) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
        await Thoughts.deleteMany({ id: { $in: users.thoughts } });
        res.json({message:'user and thoughts were deleted'})
    } catch (err) {
      res.status(500).json(err);
    }
}
const updateUser = async (req, res) => {
       try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId }
      );

      if (!users) {
        return res.status(404).json({ message: 'No user with this ID' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
 }
    
module.exports= {getUser, getSingleUser, createUser, deleteUser, updateUser}