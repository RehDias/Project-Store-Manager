const sinon = require('sinon');

const response = () => {
  const res = {
    json: sinon.stub().returns(),
    status: sinon.stub().callsFake(() => res),
  };
  return res;
}

module.exports = response;