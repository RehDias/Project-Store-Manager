const errorHandler = ({ name, message }, _req, res, _next) => {
  let code = 0;

  switch (message) {
    case '"name" length must be at least 5 characters long':
      code = 422;
      break;
    case 'Product not found':
      code = 404;
      break;
    default: code = 400
  }

  switch (name) {
    case 'ValidationError':
      res.status(code).json({ message });
      break;
    case 'NotFoundError':
      res.status(code).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorHandler;