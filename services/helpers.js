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

  switch (message) { 
    case 'Product not found':
      code = 404;
      return code;
    default: code = 400; return code;
  }
};

module.exports = { validateSchema, errorCode };