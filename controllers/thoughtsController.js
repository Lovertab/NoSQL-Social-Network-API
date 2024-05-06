const { get } = require('mongoose');
const { Thoughts, User} = require('../models');

module.exports = {
    async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find()
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
    },
     async getSingleThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
    },
     async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    },
     async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtsId },
        { $pull: { thoughts: req.params.thoughtsId } },
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'Thought was deleted but no user found with this thought' });
      }
      res.json({ message: 'Thought was successfully deleted!!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
     
     async updateThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        {new:true, runValidators:true}
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'thought was not updated' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thoughts) {
        return res.status(404).json({message:'thought not found'})
      }
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err)
       }
  },
  async deleteReaction(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        {new:true, runValidators:true}
      )
      if (!thoughts) {
         return res.status(404).json({message:'thought not found'})
      }
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}