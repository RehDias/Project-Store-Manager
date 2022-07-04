const validateSchema = (schema) => async (data) => {
  const result = await schema.validateAsync(data);
  return result;
};

const errorCode = (message) => {
  let code = 0;
  
  if (message.includes('must be')) {
    code = 422;
    return code;
  }

  if (message.includes('not found')) {
    code = 404;
    return code;
  }

  code = 400;
  return code;
};

module.exports = { validateSchema, errorCode };