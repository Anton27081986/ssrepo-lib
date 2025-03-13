import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-essentials',
	],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	staticDirs: ['../src/lib/shared/assets/fonts'],
};
export default config;
