import express, { request, response } from 'express'
import UserController from '../controllers/user.controller.js'

const user_route = express.Router()

user_route.get('/',UserController.getAll)

user_route.get('/:user_id', UserController.getById)

export default user_route