module.exports = {
  // testEnvironment: 'jest-environment-fifteen',
  // setupFiles: ['jest-canvas-mock'],
  setupFiles: ['./jestSetup.ts'],
  testEnvironmentOptions: {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
  },
}
