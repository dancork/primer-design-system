const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  resolver: '@nrwl/jest/plugins/resolver',
}
