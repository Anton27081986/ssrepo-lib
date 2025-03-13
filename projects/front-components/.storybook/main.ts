import type { StorybookConfig } from '@storybook/angular';
import * as sass from 'sass';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-styling-webpack',
			options: {
				rules: [
					{
						test: /\.s[ac]ss$/i,
						use: [
							"style-loader",
							"css-loader",
							{
								loader: "sass-loader",
								options: { implementation: sass }
							},
						],
					}
				]
			}
		}
	],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	staticDirs: ['../src/lib/shared/assets/fonts']
};
export default config;
