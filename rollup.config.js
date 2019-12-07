import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import { scss, typescript as typescriptPreprocess } from 'svelte-preprocess';
import alias from '@rollup/plugin-alias';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js',
	},
	plugins: [
		json(),
		alias({
			resolve: ['.js', '.ts'],
			entries: {
				assets: 'public/assets',
			},
		}),
		svelte({
			preprocess: [
				scss(),
				typescriptPreprocess({
					tsconfigFile: './tsconfig.json',
				}),
			],
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: (css) => {
				css.write('public/bundle.css');
			},
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: (importee) =>
				importee === 'svelte' || importee.startsWith('svelte/'),
		}),
		commonjs(),
		typescript(),

		image(),
		serve({
			contentBase: 'public',
			historyApiFallback: true,
			// port: 5001,
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload(),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
