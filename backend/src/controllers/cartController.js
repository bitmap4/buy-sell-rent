const User = require('../models/User');
const Item = require('../models/Item');

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
    
    // Get user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Get item and check seller
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    // Check if user is seller
    if (item.sellerId.toString() === user._id.toString()) {
      return res.status(403).json({ error: 'Cannot add your own item to cart' });
    }
    
    // Check if item already exists in cart
    const itemIndex = user.cart.findIndex(cartItem => cartItem.item.toString() === itemId);
    
    if (itemIndex >= 0) {
      user.cart[itemIndex].quantity += qty;
    } else {
      user.cart.push({ item: itemId, quantity: qty });
    }
    
    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    
    // Find user and verify existence
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find item in cart
    const cartItemIndex = user.cart.findIndex(item => 
      item.item.toString() === itemId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Update quantity
    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    // Return populated cart data
    const updatedUser = await User.findById(req.user.id)
      .populate('cart.item');

    res.json({ cart: updatedUser.cart });
  } catch (error) {
    console.error('Cart update error:', error);
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