const Order = require('../models/Order');
const User = require('../models/User');
const Item = require('../models/Item');
const bcrypt = require('bcrypt');

const generateOTP = async () => {
  const otpPlain = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const hashedOtp = await bcrypt.hash(otpPlain, 10);
  return { otpPlain, hashedOtp };
};

exports.placeOrder = async (req, res) => {
  try {
    // Use user's cart items for order placement
    const user = await User.findById(req.user.id).populate('cart.item');
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.cart.length) return res.status(400).json({ error: 'Cart is empty' });

    // Calculate total and determine seller.
    // Assumes all cart items belong to the same seller.
    let total = 0;
    let sellerId = null;
    const orderItems = user.cart.map(cartItem => {
      total += cartItem.item.price * cartItem.quantity;
      // Assume each item has a seller field.
      if (!sellerId) sellerId = cartItem.item.sellerId;
      return { item: cartItem.item._id, quantity: cartItem.quantity };
    });

    if (!sellerId) {
      return res.status(400).json({ error: 'Seller information missing on items' });
    }

    const { otpPlain, hashedOtp } = await generateOTP();

    const order = await Order.create({
      buyer: req.user.id,
      seller: sellerId,
      items: orderItems,
      total,
      otp: hashedOtp
    });

    // Clear user's cart
    user.cart = [];
    await user.save();

    // In production, the plain OTP would be sent securely to buyer/seller.
    res.status(201).json({ order, otp: otpPlain });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { type } = req.query; // type: pending, bought, sold
    let query = {};

    if (type === 'pending') {
      query.status = 'pending';
      query.$or = [{ buyer: req.user.id }, { seller: req.user.id }];
    } else if (type === 'bought') {
      query.buyer = req.user.id;
    } else if (type === 'sold') {
      query.seller = req.user.id;
    } else {
      // default: return orders for buyer
      query.buyer = req.user.id;
    }

    const orders = await Order.find(query)
      .populate('buyer', 'firstName lastName email')
      .populate('seller', 'firstName lastName email')
      .populate('items.item');
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { orderId, otp } = req.body;
    if (!orderId || !otp) {
      return res.status(400).json({ error: 'Order id and otp are required' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Order is not pending' });
    }

    const isMatch = await bcrypt.compare(otp, order.otp);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    res.json({ verified: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ error: 'OTP is required' });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Order is not pending' });
    }
    // Only seller can complete order.
    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to complete this order' });
    }

    const isMatch = await bcrypt.compare(otp, order.otp);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    order.status = 'completed';
    await order.save();
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};