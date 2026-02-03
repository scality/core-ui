module.exports = {
  clearMocks: true,
  globalSetup: './global-setup.js',
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    // Strip .js extension for FA dynamic imports (webpack needs .js, Jest doesn't)
    '^@fortawesome/free-solid-svg-icons/(.+)\\.js$':
      '@fortawesome/free-solid-svg-icons/$1',
    '^@fortawesome/free-regular-svg-icons/(.+)\\.js$':
      '@fortawesome/free-regular-svg-icons/$1',
  },
  testEnvironment: 'jsdom',
};
