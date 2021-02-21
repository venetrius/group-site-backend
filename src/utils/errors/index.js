const BadRequest = message => ({
  message: message || 'Bad Request',
  status: 400
})

const Unauthorized = message => ({
  message: message || 'Unauthorized',
  status: 403
})

const NotFoundError = message => ({
  message: message || 'Not Found',
  status: 404
})

const InternalError = message => ({
  message: message || 'Internal Server Error',
  status: 500
})

module.exports = {
  BadRequest,
  InternalError,
  NotFoundError,
  Unauthorized
}
