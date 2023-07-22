import { Request, Response } from 'express'
import db from './db'

export function getTask(_: Request, res: Response) {
  return res.status(200).json({ data: db.getTasks() })
}

export function addTask(req: Request, res: Response) {
  const { name, completed } = req.body
  try {
    const newTask = db.addTask(name, completed)
    return res.status(201).json({ data: newTask })
  } catch (error) {
    return res.status(500).json({ sucess: false, msg: error.message })
  }
}

export function deleteTask(req: Request, res: Response) {
  const { id } = req.params
  try {
    db.removeTask(Number(id))
    return res.status(200).json({ sucess: true })
  } catch (error) {
    return res.status(404).json({ sucess: false, msg: error.message })
  }
}

export function updateTask(req: Request, res: Response) {
  const { id } = req.params
  const { name, completed } = req.body
  try {
    const task = db.updateTask(Number(id), name, completed)
    return res.status(200).json({ data: task })
  } catch (error) {
    return res.status(404).json({ sucess: false, msg: error.message })
  }
}
