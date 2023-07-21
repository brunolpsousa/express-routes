import express from 'express'
const app = express()

const port = 3000

let data = [
  { id: 1, name: 'initial task 1', completed: true },
  { id: 2, name: 'initial task 2', completed: false },
]

app.use(express.json())

function getTask(_, res) {
  return res.status(200).json({ data })
}

function addTask(req, res) {
  const { name, completed } = req.body
  if (!name || typeof name !== 'string' || name.length > 20)
    return res.status(500).json({ sucess: false, msg: 'invalid name' })
  if (completed && typeof completed !== 'boolean')
    return res
      .status(500)
      .json({ sucess: false, msg: "invalid type: 'completed'" })

  const newTask = {}
  newTask.id = Math.round(Math.random() * Date.now() * (data.length + 1))
  newTask.name = name
  newTask.completed = completed ?? false

  data = [...data, newTask]
  return res.status(200).json({ data: newTask })
}

function deleteTask(req, res) {
  const { id } = req.params
  for (let value of data.values()) {
    if (value.id === Number(id)) {
      data = data.filter((v) => v.id !== Number(id))
      return res.status(200).json({ sucess: true })
    }
  }
  return res.status(404).json({ sucess: false, msg: 'task not found' })
}

function updateTask(req, res) {
  const { id } = req.params
  const { name, completed } = req.body
  let task

  for (let value of data.values()) {
    if (value.id === Number(id)) {
      task = value
    }
  }

  if (!task)
    return res.status(404).json({ sucess: false, msg: 'task not found' })
  if (name && typeof name === 'string' && name.length <= 20) task.name = name
  if (typeof completed === 'boolean') task.completed = completed

  return res.status(200).json({ data: task })
}

app.get('/api/v1/tasks', getTask)
app.post('/api/v1/tasks', addTask)
app
  .route('/api/v1/tasks/:id')
  .put(updateTask)
  .patch(updateTask)
  .delete(deleteTask)
app.use((_, res) => res.status(404).send('Route does not exist'))

app.listen(port)
