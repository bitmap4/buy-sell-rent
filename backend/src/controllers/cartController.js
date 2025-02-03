const User = require('../models/User');

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.item');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const qty = quantity || 1;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Check if item already exists in cart
    const itemIndex = user.cart.findIndex(cartItem => cartItem.item.toString() === itemId);
    
    if (itemIndex >= 0) {
      // If item exists, update the quantity
      user.cart[itemIndex].quantity += qty;
    } else {
      // Otherwise, add new item into the cart
      user.cart.push({ item: itemId, quantity: qty });
    }
    
    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Remove the item with matching item id
    user.cart = user.cart.filter(cartItem => cartItem.item.toString() !== itemId);
    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Clear whole cart
    user.cart = [];
    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};