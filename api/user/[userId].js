import connectToMongodb from '../../api-src/db/connectToMongodb'
import User from '../../api-src/model/User'

const userEntityHandler = async (request, response) => {
  const { userId } = request.query

  await connectToMongodb()

  try {
    const foundUser = await User.findById(userId)
    delete foundUser.password
    return response.status(200).json(foundUser)
  } catch (error) {
    const message = `User not found ${userId}`
    console.error(message)
    return response.status(404).json({ code: 404, message })
  }
}

export default userEntityHandler
