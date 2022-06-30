const validateSchema = (schema) => async (data) => {
  const result = await schema.validateAsync(data);
  return result;
};

module.exports = { validateSchema };