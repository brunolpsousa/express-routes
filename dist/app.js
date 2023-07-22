"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const controller_1 = require("./controller");
const port = 3000;
app.use(express_1.default.json());
app.get('/api/v1/tasks', controller_1.getTask);
app.post('/api/v1/tasks', controller_1.addTask);
app
    .route('/api/v1/tasks/:id')
    .put(controller_1.updateTask)
    .patch(controller_1.updateTask)
    .delete(controller_1.deleteTask);
app.use((_, res) => res.status(404).send('Route does not exist'));
app.listen(port, () => console.log(`Listening on port ${port}`));
