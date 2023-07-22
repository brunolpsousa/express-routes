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
export default tasks
