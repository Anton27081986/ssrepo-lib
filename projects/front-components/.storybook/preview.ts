import type { Preview } from '@storybook/angular';
import { themes } from '@storybook/theming';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import 'zone.js';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		darkMode: {
			stylePreview: true,
		},
	},
	tags: ['autodocs'],
};

export default preview;
