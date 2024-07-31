import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const snapshot = await admin
      .firestore()
      .collection('todos')
      .where('userId', '==', res.locals.uid)
      .get()

    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, completed = false } = req.body
    const todo = {
      title,
      completed,
      userId: res.locals.uid,
    }

    const docRef = await admin.firestore().collection('todos').add(todo)
    return res.status(201).json({ id: docRef.id, ...todo })
  } catch (error) {
    return next(error)
  }
}

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId = req.params.id
    const { title, completed } = req.body

    const todoRef = admin.firestore().collection('todos').doc(todoId)
    const todo = await todoRef.get()

    if (!todo.exists) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    if (todo.data()?.userId !== res.locals.uid) {
      return res
        .status(403)
        .json({ error: 'Not authorized to update this todo' })
    }

    await todoRef.update({ title, completed })
    return res.status(200).json({ id: todoId, title, completed })
  } catch (error) {
    return next(error)
  }
}

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId = req.params.id
    const todoRef = admin.firestore().collection('todos').doc(todoId)
    const todo = await todoRef.get()

    if (!todo.exists) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    if (todo.data()?.userId !== res.locals.uid) {
      return res
        .status(403)
        .json({ error: 'Not authorized to delete this todo' })
    }

    await todoRef.delete()
    return res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    return next(error)
  }
}
