import ts from 'typescript';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: `./src/index.ts`,
	output: {
		name: 'IframeHandler',
		file: `./build/main.js`,
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		typescript({
			typescript: ts
		}),
		resolve(),
		commonjs(),
	]
}
