const Order = require('../models/Order');
const bcrypt = require('bcrypt');

exports.getPendingDeliveries = async (req, res) => {
  try {
    // Get orders for which seller is the logged-in user, status is completed and not yet delivered.
    const orders = await Order.find({
      seller: req.user.id,
      status: 'completed',
      delivered: false
    })
      .populate('buyer', 'firstName lastName email')
      .populate('items.item');
      
    res.json({ deliveries: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ error: 'OTP is required' });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Only seller can complete delivery.
    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to deliver this order' });
    }

    if (order.delivered) {
      return res.status(400).json({ error: 'Order already delivered' });
    }

    // Verify OTP (assumes the OTP remains the same as was generated earlier)
    const isMatch = await bcrypt.compare(otp, order.otp);
    if (!isMatch) return res.status(400).json({ error: 'Invalid OTP' });
    
    order.delivered = true;
    await order.save();
    res.json({ message: 'Delivery completed', order });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};