const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (userId) {
      // Get other user's public profile
      const user = await User.findById(userId)
        .select('-password') // Only public fields
        .lean();
      
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      res.json({ user });
    } else {
      // Get current user's full profile
      const user = await User.findById(req.user.id)
        .select('-password')
        .lean();
      
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      res.json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    // If password is updated, the pre-save hook in the User model will hash it.
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Verify both users exist
    const [user, reviewer] = await Promise.all([
      User.findById(userId),
      User.findById(req.user.id)
    ]);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!reviewer) return res.status(404).json({ error: 'Reviewer not found' });

    // Debug existing reviews
    console.log('Current reviews:', user.sellerReviews);

    // Clear existing reviews that might be invalid
    user.sellerReviews = [];
    await user.save();

    // Create new review
    const review = {
      rating: Number(rating),
      comment: comment || '',
      reviewer: reviewer._id,
      createdAt: new Date()
    };

    console.log('New review:', review);

    // Add single review
    user.sellerReviews = [review];
    
    // Save and handle validation errors explicitly
    try {
      await user.save();
    } catch (validationError) {
      console.error('Validation error:', validationError);
      return res.status(400).json({ error: validationError.message });
    }

    // Return populated data
    const populatedUser = await User.findById(user._id)
      .populate('sellerReviews.reviewer', 'firstName lastName');

    res.json({ user: populatedUser });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
};