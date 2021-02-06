import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve({
      browser: true,
      //preferBuiltins: true,
    }),
    json(),
    commonjs(),
    scss(),
    babel({
      presets: [
        ["@babel/preset-react",
        {
          "runtime": "automatic",
          "importSource": "preact-jsx-runtime"
        }]
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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

