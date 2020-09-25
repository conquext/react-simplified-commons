import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import externalDeps from 'rollup-plugin-peer-deps-external'
import replace from '@rollup/plugin-replace'

const external = [
  'react',
  'react-toastify',
  'clsx',
  'react-table',
  'styled-components',
]

const globals = {
  react: 'React',
  'styled-components': 'styled',
}

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'ReactSimplifiedCommons',
      file: 'dist/react-simplified-commons.development.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      replace({
        'process.env.NODE_ENV': `"development"`,
        delimiters: ['', ''],
      }),
      babel(),
      externalDeps(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactSimplifiedCommons',
      file: 'dist/react-simplified-commons.production.min.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
      babel(),
      externalDeps(),
      terser(),
      size({
        writeFile: false,
      }),
    ],
  },
]
