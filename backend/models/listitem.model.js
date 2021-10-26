const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListItemSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    list: {
      type: String,
      required: true,
    },
    version: {
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
  },
  {
    timestamps: true,
  }
);

const ListItem = mongoose.model("ListItem", ListItemSchema);

module.exports = ListItem;
