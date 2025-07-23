import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from '../../../lib/components';
import { Colors, IconType } from '../../../lib/shared/models';

const iconsList = Object.entries(IconType).map(([name, _]) => name);

const meta: Meta<IconComponent> = {
	title: 'Components/Icon',
	component: IconComponent,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'select',
			options: Object.values(IconType),
			description:
				'Тип иконки. Определяет, какая иконка будет отображена.',
			table: {
				defaultValue: { summary: IconType.Alert.toString() },
				category: 'Основные параметры',
			},
		},
		height: {
			control: 'text',
			description: 'Высота иконки в пикселях. По умолчанию: 24px.',
			table: {
				defaultValue: { summary: '24' },
				category: 'Размеры',
			},
		},
		width: {
			control: 'text',
			description: 'Ширина иконки в пикселях. По умолчанию: 24px.',
			table: {
				defaultValue: { summary: '24' },
				category: 'Размеры',
			},
		},
		color: {
			control: {
				type: 'select',
				labels: Object.fromEntries(
					Object.entries(Colors)
						.filter(([name]) =>
							name.toLowerCase().startsWith('icon'),
						)
						.map(([name, value]) => [value, name]),
				),
			},
			options: Object.entries(Colors)
				.filter(([name]) => name.toLowerCase().startsWith('icon')) // фильтруем те же элементы для options
				.map(([_, value]) => value), // оставляем только значения цветов
			description:
				'Цвет иконки. Определяет визуальное оформление иконки.',
			table: {
				defaultValue: { summary: 'IconPrimary' },
				category: 'Стилизация',
			},
		},
	},
	args: {
		icon: IconType.Alert,
		height: '24',
		width: '24',
		color: Colors.IconError,
	},
	parameters: {
		docs: {
			description: {
				component: `
### Компонент \`IconComponent\` (\`ss-lib-icon\`)

Универсальный компонент для отображения SVG иконок.
Он предоставляет возможность настройки размера, цвета и выбора иконки из предустановленного набора.

---

#### 🔹 Особенности

- Поддержка более 30 различных иконок
- Настраиваемый размер (высота и ширина)
- Возможность изменения цвета
- SVG иконки с поддержкой currentColor
- Адаптивное масштабирование

---

#### 🧩 Использование

 \`\`\`html
 <ss-lib-icon
    [icon]="IconType.Search"
    [height]="'32'"
    [width]="'32'"
    [color]="Colors.IconSecondary"
 ></ss-lib-icon>
  \`\`\`
				 `,
			},
		},
	},
};

export default meta;

type Story = StoryObj<IconComponent>;

export const Default: Story = {
	name: 'Базовый пример',
	args: {
		icon: IconType.Alert,
		height: '24',
		width: '24',
		color: Colors.IconError,
	},
};

export const DifferentIcons: Story = {
	name: 'Доступные иконки',
	render: () => ({
		template: `
			<div style="width: 300px;">
				<div style="display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap">
					@for (icon of iconsList; track $index) {
						<ss-lib-icon [icon]="IconType[icon]"></ss-lib-icon>
					}
				</div>
			</div>
			
		`,
		props: {
			IconType,
			iconsList,
		},
	}),
};

export const DifferentSizes: Story = {
	name: 'Пользовательский размер (иконка 48 x 48)',
	args: {
		icon: IconType.Alert,
		height: '48',
		width: '48',
		color: Colors.IconError,
	},
};

export const DifferentColors: Story = {
	name: 'Пользовательский цвет (цвет иконки - IconError)',
	args: {
		icon: IconType.Alert,
		height: '24',
		width: '24',
		color: Colors.IconError,
	},
};
