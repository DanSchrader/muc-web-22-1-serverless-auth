const helloHandler = (request,response) => {
    const {name} = request.query

    response.status(200).json({message: `Hello ${name}`})
}

export default helloHandler

