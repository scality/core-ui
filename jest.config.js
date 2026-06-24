export default {
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
  // Transform both .js and .mjs files with Babel
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  // Never discover tests or mocks inside git worktrees under .claude/ — they are
  // separate checkouts with their own package boundary and break babel transforms.
  testPathIgnorePatterns: ['/node_modules/', '/\\.claude/'],
  modulePathIgnorePatterns: ['/\\.claude/'],
};
