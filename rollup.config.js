// import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/phash.js',
    format: 'umd',
    name: 'pHash'
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
  ]
}
