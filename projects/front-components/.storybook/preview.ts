import type { Preview } from '@storybook/angular';
import { create } from '@storybook/theming';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { useDarkMode } from 'storybook-dark-mode';
import 'zone.js';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const lightTheme = create({
	base: 'light',
	appBg: '#fafaf9',
});

const darkTheme = create({
	base: 'dark',
	appBg: '#191919',
});

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		darkMode: {
			dark: darkTheme,
			light: lightTheme,
			darkClass: 'dark',
			lightClass: 'light',
			stylePreview: true,
		},
		docs: {
			theme: lightTheme,
		},
	},
	decorators: [
		(storyFn) => {
			const isDark = useDarkMode();
			// Меняем фон для Canvas
			document.body.style.backgroundColor = isDark
				? '#191919'
				: '#fafaf9';
			document.body.classList.toggle('dark', isDark);
			document.body.classList.toggle('light', !isDark);

			const previewContainer = document.querySelector(
				'.sbdocs-preview',
			) as HTMLElement | null;
			if (previewContainer) {
				previewContainer.style.backgroundColor = isDark
					? '#191919'
					: '#fafaf9';
			}

			return storyFn();
		},
	],
	tags: ['autodocs'],
};

export default preview;
