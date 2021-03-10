/**
 * @author Francisco González
 * @description External API Main Router
 */
import { Express, Request, Response, Router } from 'express'
import usersRouter from "./routes/usersRouter"

const router = new Router()


router.get('/', (req,res) => (res.json({
  name: "GTD Internal API",
  version: "1.0-alpha"
})))

/**
 * @param {Response} res
 * @param {Request} req
 */
router.post('/ping', (req,res) => {res.send("pong!")})


router.use('/users', usersRouter)

module.exports = router
