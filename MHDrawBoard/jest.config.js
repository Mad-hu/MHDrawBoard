module.exports = {
  testURL: 'http://localhost',
  testMatch: ['<rootDir>/test/*.js'],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
      global: {
          branches: 50,
          function: 50,
          lines: 50,
          statements: 50
      }
  }
}