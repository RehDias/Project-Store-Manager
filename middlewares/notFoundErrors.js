class productNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'productNotFoundError';
  };
};

class salesNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'salesNotFoundError';
  };
};

module.exports = { productNotFoundError, salesNotFoundError };