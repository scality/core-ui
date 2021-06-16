module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
