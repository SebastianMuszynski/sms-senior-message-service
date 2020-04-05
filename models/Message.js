const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: String,
  body: String,
  category: String,
}, { timestamps: true });

messageSchema.pre('save', function save(next) {
  const msg = this;
  if (msg.body.includes("ran out")) {
    this.category = 'daily_help';
  } else {
    this.category = 'other';
  }
  return next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
