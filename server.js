const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Todo Schema
const TodoSchema = new mongoose.Schema({
text: String
});

const Todo = mongoose.model("Todo", TodoSchema);

// Get all todos
app.get("/todos", async (req, res) => {
try {
const todos = await Todo.find();
res.json(todos);
} catch (error) {
res.status(500).json(error);
}
});

// Add todo
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

// Delete todo
app.delete("/delete/:id", async (req, res) => {
try {
await Todo.findByIdAndDelete(req.params.id);
res.json({ message: "Deleted successfully" });
} catch (error) {
res.status(500).json(error);
}
});

// Start server
app.listen(5000, () => {
console.log("Server running on port 5000");
});