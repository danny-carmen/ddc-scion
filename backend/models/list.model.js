const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListItemSchema = new Schema({
  version: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    trim: true,
  },
  children: {
    type: [String],
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});
