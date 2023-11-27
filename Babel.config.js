module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-env',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  plugins: ['@babel/plugin-transform-runtime'],
}
