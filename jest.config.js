const coveragePathIgnorePatterns = [
   'node_modules',
   'globals.d.ts'
]

const moduleMapperForWebApp = {
   '@root/(.*)': '<rootDir>/src/$1',
   '@helpers/(.*)': '<rootDir>/src/helpers/$1',
   '@state/(.*)': '<rootDir>/src/state/$1',
   '@intf/(.*)': '<rootDir>/src/intf/$1',
   '@frontend/(.*)': '<rootDir>/src/frontend/$1'
}


module.exports = {
   verbose: true,
   rootDir: '.',
   roots: ['./src'],
   displayName: 'components',
   testEnvironment: 'jsdom',
   testMatch: [
      '<rootDir>/src/**/*.test.tsx'
   ],
   transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
   },
   moduleNameMapper: moduleMapperForWebApp,
   moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
   setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect'
   ],
   coverageDirectory: '.coverage',
   collectCoverage: true,
   collectCoverageFrom: [
      '<rootDir>/src/**/*.{tsx,ts}'
   ],
   coveragePathIgnorePatterns,
   coverageThreshold: {
      global: {
         branches: 50,
         functions: 50,
         lines: 50,
         statements: -500
      }
   }
}
