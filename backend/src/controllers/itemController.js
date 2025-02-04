const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ quantity: { $gt: 0 } });
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const quantity = req.body['quantity'] || 1;
    const tags = req.body['tags'] || [];
    console.log(req.body['tags']);
    const images = req.files?.map(file => `${process.env.BACKEND_URL}/uploads/${file.filename}`) || [];
    const sellerId = req.user.id;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const item = new Item({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      images,
      tags: Array.isArray(tags) ? tags : [tags],
      sellerId
    });

    await item.save();
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};