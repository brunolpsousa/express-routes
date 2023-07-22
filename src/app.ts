import express from 'express'
const app = express()

const port = 3000

interface TaskSchema {
  id: number
  name: string
  completed: boolean
}

class Task {
  private data: TaskSchema[] = []
  private static instance: Task

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Task()
    return this.instance
  }

  addTask(name: string, completed?: boolean) {
    if (
      name === undefined ||
      !(typeof name === 'string' && name.trim().length > 0 && name.length < 30)
    )
      throw Error('Invalid name')

    if (completed !== undefined && typeof completed !== 'boolean')
      throw Error("Invalid type: 'completed'")

    const id = Math.round(Math.random() * Date.now()) * (this.data.length + 1)
    name = name.trim()
    completed ??= false
    const task = { id, name, completed }
    this.data.push(task)
    return task
  }

  removeTask(id: number) {
    id = Number(id)

    for (const task of this.data.values()) {
      if (task.id === id) {
        this.data = this.data.filter((v) => v.id !== id)
        return
      }
    }
    throw Error('Task not found')
  }

  updateTask(id: number, name: string, completed: boolean) {
    id = Number(id)

    if (
      name !== undefined &&
      !(typeof name === 'string' && name.trim().length > 0 && name.length < 30)
    )
      throw Error('Invalid name')

    if (completed !== undefined && typeof completed !== 'boolean')
      throw Error("Invalid type: 'completed'")

    for (const value of this.data.values()) {
      if (value.id === id) {
        name && (value.name = name)
        typeof completed === 'boolean' && (value.completed = completed)
        return value
      }
    }
    throw Error('Task not found')
  }

  getTasks() {
    if (Task.instance) {
      return Task.instance.data
    }
  }
}

const tasks = Task.getInstance()

app.use(express.json())

function getTask(_: express.Request, res: express.Response) {
  return res.status(200).json({ data: tasks.getTasks() })
}

function addTask(req: express.Request, res: express.Response) {
  const { name, completed } = req.body
  try {
    const newTask = tasks.addTask(name, completed)
    return res.status(201).json({ data: newTask })
  } catch (error) {
    return res.status(500).json({ sucess: false, msg: error.message })
  }
}

function deleteTask(req: express.Request, res: express.Response) {
  const { id } = req.params
  try {
    tasks.removeTask(Number(id))
    return res.status(200).json({ sucess: true })
  } catch (error) {
    return res.status(404).json({ sucess: false, msg: error.message })
  }
}

function updateTask(req: express.Request, res: express.Response) {
  const { id } = req.params
  const { name, completed } = req.body
  try {
    const task = tasks.updateTask(Number(id), name, completed)
    return res.status(200).json({ data: task })
  } catch (error) {
    return res.status(404).json({ sucess: false, msg: error.message })
  }
}

app.get('/api/v1/tasks', getTask)
app.post('/api/v1/tasks', addTask)
app
  .route('/api/v1/tasks/:id')
  .put(updateTask)
  .patch(updateTask)
  .delete(deleteTask)
app.use((_: express.Request, res: express.Response) =>
  res.status(404).send('Route does not exist'),
)

app.listen(port)
