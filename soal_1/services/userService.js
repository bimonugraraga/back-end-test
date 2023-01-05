const {User} = require('../models')
const {signToken} = require('../helpers/jwthandler')
const axios = require('axios')
class UserService {
  static register = async (params, next) => {
    try {
      let newUser = await User.create(params)
      if (newUser[0] == 0) {
        throw {
          code: 400,
          message: "Failed To Register"
        }
      }
      return newUser
    } catch (error) {
      next(error)
    }
  }

  static login = async (params, next) => {
    try {
      let targetUser = await User.findOne({
        where: {
          username: params.username
        }
      })

      if (!targetUser){
        throw {
          code: 400,
          message: "Username Or Password Invalid"
        }
      }
      if (targetUser.password !== params.password) {
        throw {
          code: 400,
          message: "Username Or Password Invalid"
        }
      }
      let payload = {
        id: targetUser.id,
        username: targetUser.username
      }
      let jwt = signToken(payload)

      payload.token = jwt
      return payload
    } catch (error) {
      next(error)
    }
  }

  static getJobs = async (params, next) => {
    try {
      let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?`
      if (params.description) {
        url += `description=${params.description}&`
      }
      if (params.location) {
        url += `location=${params.location}&`
      }
      if (params.full_time) {
        url += `type=Full Time&`
      }

      let jobs = await axios({
        methods: 'get',
        url
      })
      let res = jobs.data
      if (params.page) {
        let limitStart = params.limit * (params.page-1)
        let limitEnd = params.limit * params.page
        res = jobs.data.slice(limitStart, limitEnd)
      }
      return res
    } catch (error) {
      next(error)
    }
  }

  static getOneJob = async(params, next) => {
    try {
      let allJobs = await this.getJobs({}, next)
      let oneJob = allJobs.filter((el) => {
        if (el.id == params.id) {
          return el
        }
      })
      if (oneJob.length == 0) {
        throw {
          code: 404,
          message: "Job Not Found"
        }
      }
      return oneJob[0]
    } catch (error) {
      next(error)
    }
  }
}
module.exports = UserService