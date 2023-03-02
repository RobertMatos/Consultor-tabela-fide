module.exports = {
    testEnvironment: 'jest-environment-jsdom', // define o ambiente de teste
    testMatch: [
      '**/__tests__/**/*.test.ts?(x)', // inclui arquivos .test.js e .test.jsx
      '**/?(*.)+(spec|test).ts?(x)', // inclui arquivos com sufixo spec ou test
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'], // extensões de arquivos que serão consideradas módulos
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest' // transforma os arquivos com babel-jest
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1' // mapeia o diretório src para @
    },
    coverageReporters: ['text', 'lcov'], // define os tipos de relatórios de cobertura que serão gerados
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}', // define os arquivos que serão cobertos pelos testes
      '!**/node_modules/**',
      '!**/vendor/**'
    ],
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80 // define as porcentagens mínimas de cobertura para cada tipo de cobertura
      }
    },
    preset: 'ts-jest',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };
  