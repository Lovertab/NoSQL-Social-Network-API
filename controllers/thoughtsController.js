const { get } = require('mongoose');
const { Thoughts } = require('../models');

module.exports = {
    async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find()
      .populate('thoughts');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
    },
     async getSingleThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
      .populate('thoughts');

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
    } catch (err) {
      res.status(500).json(err);
    }
    },
     async updateThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.courseId }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}