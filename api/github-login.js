import {
  getGitHubAccessToken,
  getGitHubName,
} from '../api-src/service/github-api-service'
import User from '../api-src/model/User'
import { createToken } from '../api-src/service/jwt-service'
import connectToMongodb from '../api-src/db/connectToMongodb'

const githubLoginHandler = async (request, response) => {
  const { method } = request

  if (method !== 'POST') {
    return response
      .status(405)
      .json({ code: 405, message: 'Method not allowed' })
  }

  const { code } = request.body

  if (!code) {
    return response.status(401).json({ code: 401, message: 'Unauthorized' })
  }

  const githubAccessToken = await getGitHubAccessToken(code)

  if (!githubAccessToken) {
    return response.status(403).json({ code: 403, message: 'Forbidden' })
  }

  const githubName = await getGitHubName(githubAccessToken)

  await connectToMongodb()

  const foundUser = await User.findOne({ githubName })

  if (foundUser) {
    const token = createToken(foundUser._id)
    return response.status(200).json({ token })
  } else {
    const newUser = new User({ githubName })
    await newUser.save()
    const token = createToken(newUser._id)
    return response.status(200).json({ token })
  }
}

export default githubLoginHandler
