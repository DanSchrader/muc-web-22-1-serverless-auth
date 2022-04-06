const helloHandler = (request, response) => {
  response
    .status(200)
    .json({ message: 'Stranger', code: 200, cat: 'https://http.cat/200' })
}

export default helloHandler
