const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const newTodo = new Todo({ title, description });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "To-Do not found" });
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTodoById = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true, runValidators: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ error: "To-Do not found" });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteTodoById = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "To-Do not found" });
        }
        res.status(200).json({ message: "To-Do item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodoById);
router.delete('/:id', deleteTodoById);

module.exports = router;
