const ListItem = require("./listitem.model");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rootListItem: {
      type: String,
      required: true,
    },
    currentFocusItem: {
      type: String,
      required: false,
    },
    nextId: {
      type: String,
      required: true,
    },
    // listItems: {
    //   type: [ListItem.Schema],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
