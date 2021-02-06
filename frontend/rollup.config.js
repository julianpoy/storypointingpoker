// rollup.config.js// node-resolve will resolve all the node dependencies
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  // All the used libs needs to be here
  external: [
    'react', 
    'react-proptypes'
  ],
  plugins: [
    resolve(),
    ["@babel/plugin-transform-react-jsx", {
        "pragma": "h",
        "pragmaFrag": "Fragment",
    }],
    alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom', replacement: 'preact/compat' }
        ]
    }),
    process.argv.includes('--watch') &&
      serve({
        host: '0.0.0.0',
        port: 3001,
        contentBase: 'dist',
      }),
    process.argv.includes('--watch') && livereload({ watch: 'dist' }),
  ]
}