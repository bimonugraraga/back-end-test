const UserService = require('../services/userService')
class UserController {
  static register = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("username", "password").value()
      let newUser = await UserService.register(params, next)
      if (newUser) {
        res.status(201).json({
          message: "success register"
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static login = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("username", "password").value()

      let login = await UserService.login(params, next)
      if (login) {
        res.status(200).json(login)
      }
    } catch (error) {
      next(error)
    }
  }

  static getJobs = async (req, res, next) => {
    try {
      let {location, description, fulltime} = req.query
      let params = {
        location,
        description,
        fulltime
      }
      let allJobs = await UserService.getJobs(params, next)
      if (allJobs) {
        res.status(200).json(allJobs)
      }
    } catch (error) {
      next(error)
    }
  }

  static getOneJob = async(req, res, next) => {
    try {
      let {id} = req.params
      let params = {
        id
      }
      let job = await UserService.getOneJob(params, next) 
      if (job) {
        res.status(200).json(job)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController