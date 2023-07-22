import { Request, Response } from 'express'
import db from './db'

export function getTask(req: Request, res: Response) {
  const { id } = req.params
  if (id)
    try {
      const task = db.getTasks(Number(id))
      return res.status(200).json({ data: task })
    } catch (error) {
      return res
        .status(error.statusCode)
        .json({ sucess: false, msg: error.message })
    }
  return res.status(200).json({ data: db.getTasks() })
}

export function addTask(req: Request, res: Response) {
  const { name, completed } = req.body
  try {
    const newTask = db.addTask(name, completed)
    return res.status(201).json({ data: newTask })
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ sucess: false, msg: error.message })
  }
}

export function deleteTask(req: Request, res: Response) {
  const { id } = req.params
  try {
    db.removeTask(Number(id))
    return res.status(200).json({ sucess: true })
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ sucess: false, msg: error.message })
  }
}

export function updateTask(req: Request, res: Response) {
  const { id } = req.params
  const { name, completed } = req.body
  try {
    const task = db.updateTask(Number(id), name, completed)
    return res.status(200).json({ data: task })
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ sucess: false, msg: error.message })
  }
}
