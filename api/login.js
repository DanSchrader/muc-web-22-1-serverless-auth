import connectToMongodb from '../api-src/db/connectToMongodb'
import User from '../api-src/model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not set')
}

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

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

  if (!isPasswordMatch) {
    return response.status(401).json({ code: 401, message: 'Unauthorized' })
  }

  const token = jwt.sign({ sub: foundUser._id }, JWT_SECRET)

  response.status(200).json({ token })
}

export default loginHandler
