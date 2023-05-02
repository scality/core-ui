module.exports = {
  clearMocks: true,
  globalSetup: './global-setup.js',
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
