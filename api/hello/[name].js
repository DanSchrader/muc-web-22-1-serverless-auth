const helloHandler = (request, response) => {
  const { name } = request.query

  response
    .status(200)
    .json({ message: `Hello ${name}`, code: 200, cat: 'https://http.cat/200' })
}

export default helloHandler
