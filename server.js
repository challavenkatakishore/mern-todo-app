const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/tododb")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

/* Todo Model */

const TodoSchema = new mongoose.Schema({
  text: String
});

const Todo = mongoose.model("Todo", TodoSchema);

/* Get Todos */

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Add Todo */

app.post("/add", async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Delete Todo */

app.delete("/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Server */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});