/**
 * @author Francisco González
 * @description External API Users Router
 */

import { Express, Request, Response, Router } from 'express'
import userController from "../controller/userController"

const router = Router()

router.get('/', (req,res)=>userController.getUsers(req,res))

router.get('/:id', (req,res)=>userController.getUser(req,res))

module.exports = router
