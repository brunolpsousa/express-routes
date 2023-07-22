"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
class Task {
    constructor() {
        this.data = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Task();
        return this.instance;
    }
    addTask(name, completed) {
        if (name === undefined ||
            !(typeof name === 'string' && name.trim().length > 0 && name.length < 30))
            throw Error('Invalid name');
        if (completed !== undefined && typeof completed !== 'boolean')
            throw Error("Invalid type: 'completed'");
        const id = Math.round(Math.random() * Date.now()) * (this.data.length + 1);
        name = name.trim();
        completed !== null && completed !== void 0 ? completed : (completed = false);
        const task = { id, name, completed };
        this.data.push(task);
        return task;
    }
    removeTask(id) {
        id = Number(id);
        for (const task of this.data.values()) {
            if (task.id === id) {
                this.data = this.data.filter((v) => v.id !== id);
                return;
            }
        }
        throw Error('Task not found');
    }
    updateTask(id, name, completed) {
        id = Number(id);
        if (name !== undefined &&
            !(typeof name === 'string' && name.trim().length > 0 && name.length < 30))
            throw Error('Invalid name');
        if (completed !== undefined && typeof completed !== 'boolean')
            throw Error("Invalid type: 'completed'");
        for (const value of this.data.values()) {
            if (value.id === id) {
                name && (value.name = name);
                typeof completed === 'boolean' && (value.completed = completed);
                return value;
            }
        }
        throw Error('Task not found');
    }
    getTasks() {
        if (Task.instance) {
            return Task.instance.data;
        }
    }
}
const tasks = Task.getInstance();
app.use(express_1.default.json());
function getTask(_, res) {
    return res.status(200).json({ data: tasks.getTasks() });
}
function addTask(req, res) {
    const { name, completed } = req.body;
    try {
        const newTask = tasks.addTask(name, completed);
        return res.status(201).json({ data: newTask });
    }
    catch (error) {
        return res.status(500).json({ sucess: false, msg: error.message });
    }
}
function deleteTask(req, res) {
    const { id } = req.params;
    try {
        tasks.removeTask(Number(id));
        return res.status(200).json({ sucess: true });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, msg: error.message });
    }
}
function updateTask(req, res) {
    const { id } = req.params;
    const { name, completed } = req.body;
    try {
        const task = tasks.updateTask(Number(id), name, completed);
        return res.status(200).json({ data: task });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, msg: error.message });
    }
}
app.get('/api/v1/tasks', getTask);
app.post('/api/v1/tasks', addTask);
app
    .route('/api/v1/tasks/:id')
    .put(updateTask)
    .patch(updateTask)
    .delete(deleteTask);
app.use((_, res) => res.status(404).send('Route does not exist'));
app.listen(port);
