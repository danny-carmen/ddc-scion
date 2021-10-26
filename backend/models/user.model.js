const mongoose = require("mongoose");
const List = require("./list.model");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    version: {
      type: String,
      required: true,
    },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    currentList: { type: String },
    lists: {
      type: [List.schema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
