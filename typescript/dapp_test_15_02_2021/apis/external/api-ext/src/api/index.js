/**
 * @author Francisco González
 * @description External API Main Router
 */
import { Express, Request, Response, Router } from 'express'
import usersRouter from "./routes/usersRouter"
import internal_api from "../services/internal-api"
import internalApi from "../services/internal-api"

/**
 * @type Router
 */
const router = new Router()



router.get('/', (req, res) => (res.json({
  name: "GTD External API",
  version: "1.0-alpha"
})))

router.get('/ping2internal', async (req, res) => {
  internalApi.ping().then( result => {
    res.send({
      response_from: "API Internal",
      message: result
    })
  }).catch( error => {
    res.status(500).json({
      message: "Error communicating with internal API",
      error: error
    })
  })
})

//router.use('/users', usersRouter)

module.exports = router
