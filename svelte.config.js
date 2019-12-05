// svelte options exported for svelte-vscode
// import autoPreprocess from 'svelte-preprocess';
// import autoPreprocess, { scss, typescript } from 'svelte-preprocess';

const {
	preprocess: makeTsPreprocess,
	createEnv,
	readConfigFile,
} = require('@pyoner/svelte-ts-preprocess');

const env = createEnv();
const compilerOptions = readConfigFile(env);
const tsOptions = {
	env,
	compilerOptions: {
		...compilerOptions,
		allowNonTsExtensions: true,
	},
};
// const preprocess = autoPreprocess();

module.exports = {
	dev: process.env.NODE_ENV !== 'development',
	// preprocess,
};
