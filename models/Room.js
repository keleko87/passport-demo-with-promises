// models/user.js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const roomSchema = new Schema({
  title: String,
  owner: {type:Schema.Types.ObjectId, ref:'User'},
  roomProperties: Object
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model("Room", roomSchema);
