const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authn = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authn)
router.get('/jobs', UserController.getJobs)
router.get('/jobs/:id', UserController.getOneJob)

module.exports = router