const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  Title: { type: String, required: true },
  Content: { type: String, required: true },
  Category: { type: String, required: true },
  DateTime: { type: Date, default: Date.now }
});

const CategorySchema = new mongoose.Schema({
  Name: { type: String, required: true },
  CategoryId: { type: Number, required: true },
  Content: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true }
});

const Todo = mongoose.model("todos", schema);
const Category = mongoose.model("categories", CategorySchema);
const User = mongoose.model("users", UserSchema);
module.exports = {
  Todo,
  Category,
  User
};
// module.exports = mongoose.model("categories", CategorySchema);
