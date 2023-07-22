"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.addTask = exports.getTask = void 0;
const db_1 = __importDefault(require("./db"));
function getTask(_, res) {
    return res.status(200).json({ data: db_1.default.getTasks() });
}
exports.getTask = getTask;
function addTask(req, res) {
    const { name, completed } = req.body;
    try {
        const newTask = db_1.default.addTask(name, completed);
        return res.status(201).json({ data: newTask });
    }
    catch (error) {
        return res.status(500).json({ sucess: false, msg: error.message });
    }
}
exports.addTask = addTask;
function deleteTask(req, res) {
    const { id } = req.params;
    try {
        db_1.default.removeTask(Number(id));
        return res.status(200).json({ sucess: true });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, msg: error.message });
    }
}
exports.deleteTask = deleteTask;
function updateTask(req, res) {
    const { id } = req.params;
    const { name, completed } = req.body;
    try {
        const task = db_1.default.updateTask(Number(id), name, completed);
        return res.status(200).json({ data: task });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, msg: error.message });
    }
}
exports.updateTask = updateTask;
