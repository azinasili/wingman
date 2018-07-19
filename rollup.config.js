import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const banner = `/*!
 * Wingman v${pkg.version}
 * (c) 2017-${new Date().getFullYear()} ${pkg.author}
 * MIT License.
 */
`;

export default {
  input: 'src/wingman.js',
  output: [
    { banner, file: pkg.main, format: 'umd', name: 'Wingman' },
    { banner, file: pkg.module, format: 'es' },
  ],
  plugins: [
    eslint({
      include: '{src,tests}/**/*.js',
      throwOnError: true,
      throwOnWarning: true,
    }),
    babel({
      plugins: [
        'external-helpers',
        'transform-object-assign',
      ],
    }),
    uglify({
      output: {
        comments: '/^!/',
      },
      compress: {
        drop_console: true,
        pure_funcs: 'warn',
      },
    }),
  ],
};
