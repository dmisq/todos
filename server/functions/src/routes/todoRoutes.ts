import { Router } from 'express'
import * as todoController from '../controllers/todoController'
import { authenticateUser } from '../middleware/auth'

const router = Router()

router.use(authenticateUser)

router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

export default router
