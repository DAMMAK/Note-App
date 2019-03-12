const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const { Todo, Category, User } = require("./model/todo");
const app = express();
const PORT = process.env.PORT || 5001;

mongoose
  .connect("mongodb://localhost/Task")
  .then(() => console.log("Successfully connected"))
  .catch(err => console.log(`Error while connecting`));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", async (req, res, next) => {
  res.send("Welcome to Note App Micro Service");
  console.log("[Todo Object]", Todo);
});
app.get("/note", async (req, res, next) => {
  const todos = await Todo.find({});
  res.send(todos).status(200);
});
app.get("/note/:id", async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  res.send(todo).status(200);
});

app.get("/note/:userId/:id", async (req, res, next) => {
  const { userId, Id } = req.params;
  const todo = await Todo.findById({ userId, _id: Id });
  res.send(todo).status(200);
});

app.get("/categories", async (req, res, next) => {
  const categories = await Category.find({});
  res.send(categories).status(200);
});

app.get("/users", async (req, res, next) => {
  const users = await User.find({});
  res.send(users).status(200);
});
app.post("/note/:userId", async (req, res, next) => {
  let userId= req.params.userId;
  let users =await User.findById(userId);
  if(!users) res.send({err: "Invalid User"}).status(400);
  let { Title, Category, Content } = req.body;
  let todo = new Todo({
    Title,
    Category,
    Content
  });
  todo = await todo.save();
  res.send(todo).status(200);
});

app.patch("/note/:id", async (req, res, next) => {
  let todoData = {
    Title: req.body.Title,
    Category: req.body.Category,
    Content: req.body.Content
  };
  console.log(todoData);
  let id = req.params.id;
  const todo = await Todo.findByIdAndUpdate(id, todoData);
  console.log("My Todos Update data", todo);
  res.send(todo);
});

app.delete("/note/:id", async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  const delTodo = await Todo.deleteOne(todo);
  res.send(delTodo).statusCode(200);
});

app.listen(PORT, () => console.log(`Connecting to Server on ${PORT}`));
