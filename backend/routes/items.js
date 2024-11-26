const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  const item = await newItem.save();
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

module.exports = router;
