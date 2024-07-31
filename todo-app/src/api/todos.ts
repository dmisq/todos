import axios from 'axios'
import { Todo, ToDoInput } from './types'
import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'

// Normally you would store these in a .env file and not in the source code
const firebaseConfig = {
  apiKey: 'AIzaSyCjhC2O0wrOQPyIXwUnXkwwxET_hwylMMk',
  authDomain: 'costa-rica-405bd.firebaseapp.com',
  projectId: 'costa-rica-405bd',
  storageBucket: 'costa-rica-405bd.appspot.com',
  messagingSenderId: '268668691521',
  appId: '1:268668691521:web:2a4e21dec7407a20bfd2c0',
}
// Adjust this URL to match your served Firebase Functions URL
const API_URL = 'http://127.0.0.1:5001/costa-rica-405bd/us-central1/api'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser ?? (await signInAnonymously(auth)).user
  const token = await user.getIdToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getTodos = () => api.get('/todos').then((res) => res.data)
export const createTodo = (todo: ToDoInput) =>
  api.post('/todos', todo).then((res) => res.data)
export const updateTodo = (todo: Todo) =>
  api.put(`/todos/${todo.id}`, todo).then((res) => res.data)
export const deleteTodo = (id: string) =>
  api.delete(`/todos/${id}`).then((res) => res.data)
