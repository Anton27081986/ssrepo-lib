import type { StorybookConfig } from '@storybook/angular';
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'storybook-dark-mode',
		'@storybook/addon-designs',
		'@storybook/addon-docs',
		'@storybook/addon-storysource',
		'@storybook/theming'
	],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	staticDirs: [{ from: '../src/lib/shared/assets', to: '/assets' }],
};
export default config;
