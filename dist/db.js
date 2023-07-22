"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = tasks;
