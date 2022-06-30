const validateSchema = (schema) => async (data) => {
  const result = await schema.validateAsync(data);
  return result;
};

const errorCode = (message) => {
  let code = 0;
  switch (message) {
    case '"name" length must be at least 5 characters long':
      code = 422;
      return code;
    case 'Product not found':
      code = 404;
      return code;
    default: code = 400; return code;
  }
};

module.exports = { validateSchema, errorCode };