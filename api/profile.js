const profileHandler = (request, response) => {
  return response
    .status(501)
    .json({
      code: 501,
      message: 'Not implemented',
      cat: 'https://http.cat/501',
    })
}

export default profileHandler
