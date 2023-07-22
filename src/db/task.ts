import { createCustomError } from '../middleware/error'

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
      throw createCustomError(500, 'Invalid name')

    if (completed !== undefined && typeof completed !== 'boolean')
      throw createCustomError(500, "Invalid type: 'completed'")

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
    throw createCustomError(404, 'Task not found')
  }

  updateTask(id: number, name: string, completed: boolean) {
    id = Number(id)

    if (
      name !== undefined &&
      !(typeof name === 'string' && name.trim().length > 0 && name.length < 30)
    )
      throw createCustomError(500, 'Invalid name')

    if (completed !== undefined && typeof completed !== 'boolean')
      throw createCustomError(500, "Invalid type: 'completed'")

    for (const value of this.data.values()) {
      if (value.id === id) {
        name && (value.name = name.trim())
        typeof completed === 'boolean' && (value.completed = completed)
        return value
      }
    }
    throw createCustomError(404, 'Task not found')
  }

  getTasks(id?: number) {
    if (Task.instance) {
      if (id === undefined) return Task.instance.data
      id = Number(id)
      for (const value of this.data.values()) {
        if (value.id === id) {
          return value
        }
      }
      throw createCustomError(404, 'Task not found')
    }
  }
}

const tasks = Task.getInstance()
export default tasks
