const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // To hash passwords

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// A "pre-save" hook to scramble the password before it hits the database
userSchema.pre('save', async function() {
    // 1. Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;

    try {
        // 2. Await the hash directly. No 'next' needed!
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
        // If hashing fails, throw the error so the 'save()' catch block sees it
        throw error;
    }
});

module.exports = mongoose.model('User', userSchema);