import User from '../../api-src/model/User'
import connectToMongodb from '../../api-src/db/connectToMongodb'

const handlePostUser = async (request, response) => {
  const { method } = request

  if (method !== 'POST') {
    return response
      .status(405)
      .json({ code: 405, message: 'Method not allowed' })
  }

  const { name, password } = request.body

  if (!(name && password)) {
    return response
      .status(400)
      .json({ code: 400, message: 'Expected name and password' })
  }

  await connectToMongodb()

  const newUser = new User({ name, password })
  await newUser.save()

  delete newUser.password

  return response.status(200).json(newUser)
}

export default handlePostUser
