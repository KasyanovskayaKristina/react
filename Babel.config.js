module.exports = {
  presets: [
    'next/babel',
    '@swc/babel-preset-typescript',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['transform-css-import-to-string'],
  env: {
    test: {
      presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }]],
    },
  },
}
