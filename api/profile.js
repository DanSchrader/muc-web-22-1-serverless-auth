import jwt from 'jsonwebtoken'
import connectToMongodb from '../api-src/db/connectToMongodb'
import User from '../api-src/model/User'

const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not set')
}

const profileHandler = async (request, response) => {
  const { method } = request

  if (method !== 'GET') {
    return response
      .status(405)
      .json({ code: 405, message: 'Method not allowed' })
  }

  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader) {
    return response.status(401).json({ code: 401, message: 'Unauthorized' })
  }

  const token = authorizationHeader.replace('Bearer', '').trim()

  const claims = jwt.verify(token, JWT_SECRET)

  const userId = claims.sub

  await connectToMongodb()

  const foundUser = await User.findById(userId)

  foundUser.password = undefined

  response.status(200).json(foundUser)
}

export default profileHandler
