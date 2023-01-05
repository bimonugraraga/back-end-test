const { verifyToken } = require('../helpers/jwthandler')
const {User} = require('../models')
async function authn (req, res, next) {
  try {
    if (!req.headers.authorization){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    let [type, access_token] = req.headers.authorization.split(' ');
    if(!type || !access_token){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    if( type.toLowerCase() != 'bearer' ){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    let payload = verifyToken(access_token)
    if (!payload){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }
    let targetUser = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username
      }
    })

    if (!targetUser){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }
    req.user =  {
      id: targetUser.id,
      name: targetUser.username,
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authn