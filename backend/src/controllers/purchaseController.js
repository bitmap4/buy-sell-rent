const Order = require('../models/Order');
const Item  = require('../models/Item');

exports.createPurchase = async (req, res) => {
  try {
    const { items } = req.body; // items is an array: [{ item: itemId, quantity: number }]
    
    // Calculate total
    let total = 0;
    for (const entry of items) {
      const item = await Item.findById(entry.item);
      if (!item) {
        return res.status(404).json({ error: `Item not found: ${entry.item}` });
      }
      total += item.price * (entry.quantity || 1);
    }
    
    const order = await Order.create({
      user: req.user.id,
      items,
      total
    });
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};