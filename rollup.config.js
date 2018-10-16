import resolve from 'rollup-plugin-node-resolve'
import common from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/re-graph.js',
    name: 'ReGraph',
    format: 'umd',
  },
  plugins: [
    resolve(),
    common(),
    babel({
      exclude: 'node_modules/**',
    }),
    postcss({
      extract: true,
      modules: true,
    }),
  ],
  watch: {
    include: 'src/**',
  },
}
