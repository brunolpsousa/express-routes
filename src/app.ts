import express from 'express'
const app = express()

import customError from './middleware/error'
import { getTask, addTask, deleteTask, updateTask } from './controllers/task'

const port = 3000

app.use(express.json())

app.get('/api/v1/tasks', getTask)
app.post('/api/v1/tasks', addTask)
app
  .route('/api/v1/tasks/:id')
  .get(getTask)
  .put(updateTask)
  .patch(updateTask)
  .delete(deleteTask)

app.use(customError)
app.use((_: express.Request, res: express.Response) =>
  res.status(404).send('Route does not exist'),
)

app.listen(port, () => console.log(`Listening on port ${port}`))
