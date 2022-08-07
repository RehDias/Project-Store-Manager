const errorCode = {
  ValidationError: 400,
  NotFoundError: 404,
};

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  const code = errorCode[name];

  if (!code) return res.status(500).json({ message });

  if (message.includes('must be')) return res.status(422).json({ message });

  res.status(code).json({ message });
};

module.exports = errorHandler;