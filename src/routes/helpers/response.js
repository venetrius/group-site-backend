const responseHandler = (res, successCode = 201, validator) => {
  return function(err, data ) {
    if(err) {
      const errorCode = err.status || 500
      const errorMessage = err.message || 'internal error'
      res.status(errorCode).send(errorMessage);
    } else if(validator && !validator.validate(data)) {
      res.status(validator.error.errorCode, validator.error.errorMessage)
    }
    else {
      res.status(successCode).send(JSON.stringify(data))
    }
  }
}


const existsValidator = a => ({
  validate: (a === null || a === undefined), 
  error: {errorMessage: "Not Found", errorCode: 404}
})

const indexResponseHandler = (res) => responseHandler(res, 200, existsValidator)

const listResponseHandler = (res) => responseHandler(res, 200)

module.exports = {
  responseHandler,
  indexResponseHandler,
  listResponseHandler
};
