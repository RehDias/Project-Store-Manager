const errorHandler = ({ name, message }, _req, res, _next) => {
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorHandler;