const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9._%+-]*\.)?iiit.ac.in$/ },
	age: { type: Number, required: true },
	contactNumber: { type: Number, required: true },
	password: { type: String, required: true },
	cart: [{
		item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
		quantity: { type: Number, required: true, default: 1 }
	}],
	sellerReviews: [{
		review: { type: String, required: true },
		rating: { type: Number, required: true }
	}]
});

// Pre-save hook to hash password
UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(password) {
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);