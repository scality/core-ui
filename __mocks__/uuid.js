// Mock uuid module for Jest tests
let counter = 0;

const v4 = () => {
  counter += 1;
  return `mock-uuid-${Math.random().toString(36)}-${counter}`;
};

module.exports = {
  v4,
};
