import * as express from 'express'
import * as cors from 'cors'
import todoRoutes from './routes/todoRoutes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.use('/todos', todoRoutes)

app.use(errorHandler)

export default app
