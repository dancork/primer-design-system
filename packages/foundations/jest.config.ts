import * as fs from 'fs'

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  fs.readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8'),
)

module.exports = {
  displayName: 'foundations',
  preset: '../../jest.preset.ts',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/foundations',
}
