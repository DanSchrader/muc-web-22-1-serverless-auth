import connectToMongodb from '../api-src/db/connectToMongodb'
import User from '../api-src/model/User'
import { createToken } from '../api-src/service/jwt-service'
import { isPasswordMatch } from '../api-src/service/password-service'

const loginHandler = async (request, response) => {
  const { method } = request

  if (method !== 'POST') {
    return response
      .status(405)
      .json({ code: 405, message: 'Method not allowed' })
  }

  const { name, password } = request.body

  if (!(name && password)) {
    return response
      .status(404)
      .json({ code: 404, message: 'Name and password required' })
  }

  await connectToMongodb()

  const foundUser = await User.findOne({ name })

  if (!foundUser) {
    return response.status(401).json({ code: 401, message: 'Unauthorized' })
  }

  const isMatch = await isPasswordMatch(password, foundUser.password)

  if (!isMatch) {
    return response.status(401).json({ code: 401, message: 'Unauthorized' })
  }

  const token = createToken(foundUser._id)

  response.status(200).json({ token })
}

export default loginHandler
