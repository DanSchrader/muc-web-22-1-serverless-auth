const loginHandler = (request, response) => {
  return response.status(501).json({
    code: 501,
    cat: 'https://http.cat/501',
    message: 'Not implemented',
  })
}

export default loginHandler
