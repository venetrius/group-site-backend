const responseHandler = (res, successCode = 201) => {
  return function(err, data ) {
    console.log({data})
    if(err) {
      const errorCode = err.status || 500
      const errorMessage = err.message || 'internal error'
      res.status(errorCode).send(errorMessage);
    } else {
      res.status(successCode).send(JSON.stringify(data))
    }
  }
}

module.exports = responseHandler;
