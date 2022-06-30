const { errorCode } = require('../services/helpers');

const errorHandler = ({ name, message }, _req, res, _next) => {
  const code = errorCode(message);

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