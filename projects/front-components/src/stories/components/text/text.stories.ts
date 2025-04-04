import type { Meta, StoryObj } from '@storybook/angular';
import {
	Colors,
	TextType,
	TextWeight,
	Align,
} from '../../../lib/shared/models';
import { TextComponent } from '../../../lib/components';

// Генерация списка цветов автоматически
const textColors = Object.entries(Colors)
	.filter(([name]) => name.toLowerCase().startsWith('text'))
	.map(([name, _]) => `- \`${name}\``)
	.join('\n');

const textColorsList = Object.entries(Colors)
	.filter(([name]) => name.toLowerCase().startsWith('text'))
	.map(([name, _]) => name);

const meta: Meta<TextComponent> = {
	title: 'Components/Text',
	component: TextComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: Object.values(TextType),
			description: 'Размерность шрифта',
			table: {
				defaultValue: { summary: TextType.BodyMd },
			},
		},
		weight: {
			control: 'select',
			options: Object.values(TextWeight),
			description: 'Толщина шрифта',
			table: {
				defaultValue: { summary: TextWeight.Regular },
			},
		},
		color: {
			control: {
				type: 'select',
				labels: Object.fromEntries(
					Object.entries(Colors)
						.filter(([name]) =>
							name.toLowerCase().startsWith('text'),
						)
						.map(([name, value]) => [value, name]),
				),
			},
			options: Object.entries(Colors)
				.filter(([name]) => name.toLowerCase().startsWith('text')) // фильтруем те же элементы для options
				.map(([_, value]) => value), // оставляем только значения цветов
			description: 'Цвет текста',
			table: {
				defaultValue: { summary: 'TextHeadings' },
			},
		},
		align: {
			control: 'select',
			options: Object.values(Align),
			description: 'Выравнивание текста',
			table: {
				defaultValue: { summary: Align.Start },
			},
		},
		lineClampCount: {
			control: { type: 'number', min: 1, max: 10 },
			description: 'Количество строк для ограничения line-clamp',
			table: {
				defaultValue: { summary: '2' },
			},
		},
		isLineClamp: {
			control: 'boolean',
			description: 'Ограничить количество строк текста',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		isEllipsis: {
			control: 'boolean',
			description: 'Добавить многоточие при переполнении',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		isUnderline: {
			control: 'boolean',
			description: 'Добавить подчеркивание',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
### Компонент \`TextComponent\` (\`ss-lib-text\`)

Универсальный компонент для отображения текста с настраиваемыми стилями. Позволяет задавать размер, толщину, цвет, выравнивание и другие свойства текста.

---

#### 🔹 Особенности

- Поддержка различных размеров текста (\`HeadingXs\` – \`BodyXs\`)
- Настраиваемая толщина шрифта (\`Regular\` – \`Bold\`)
- Широкая палитра цветов
- Гибкие варианты выравнивания
- Многоточие при обрезке строк
- Подчеркивание текста

---

#### 🧩 Использование

\`\`\`html
<ss-lib-text
  [type]="TextType.BodyMd"
  [weight]="TextWeight.Regular"
  [color]="Colors.TextHeadings"
  [align]="Align.Start"
  [isLineClamp]="false"
  [isEllipsis]="false"
  [isUnderline]="false"
>
  Ваш текст здесь
</ss-lib-text>
\`\`\`

---

#### 📏 Доступные размеры текста

- \`HeadingXs\` — Заголовок Xs  
- \`BodyXl\`, \`BodyLg\`, \`BodyMd\`, \`BodySm\`, \`BodyXs\`

#### 🔠 Толщина шрифта

- \`Regular\`  
- \`Medium\`  
- \`SemiBold\`  
- \`Bold\`

#### 🎨 Цвета текста

${textColors}

#### 📐 Выравнивание

- \`Start\` — По левому краю  
- \`Center\` — По центру  
- \`End\` — По правому краю
        `,
			},
		},
	},
	args: {
		type: TextType.BodyMd,
		weight: TextWeight.Regular,
		color: Colors.TextHeadings,
		align: Align.Start,
		lineClampCount: 2,
		isLineClamp: false,
		isEllipsis: false,
		isUnderline: false,
	},
};

export default meta;

type Story = StoryObj<TextComponent>;

export const Default: Story = {
	args: {
		type: TextType.BodyMd,
		weight: TextWeight.Regular,
		color: Colors.TextHeadings,
		align: Align.Start,
	},
	render: (args) => ({
		props: args,
		template: `
			<ss-lib-text
				[type]="type"
				[weight]="weight"
				[color]="color"
				[align]="align"
				[lineClampCount]="lineClampCount"
				[isLineClamp]="isLineClamp"
				[isEllipsis]="isEllipsis"
				[isUnderline]="isUnderline"
			>
				Это пример текста с настраиваемыми стилями. Вы можете изменить размер, толщину, цвет и выравнивание текста.
			</ss-lib-text>
		`,
	}),
};

// export const DifferentTypes: Story = {
// 	render: () => ({
// 		template: `
// 			<div style="display: flex; flex-direction: column; gap: 16px;">
// 				<ss-lib-text [type]="TextType.HeadingXs">Xs Заголовок</ss-lib-text>
// 				<ss-lib-text [type]="TextType.BodyXl">Xl текст</ss-lib-text>
// 				<ss-lib-text [type]="TextType.BodyLg">Lg текст</ss-lib-text>
// 				<ss-lib-text [type]="TextType.BodyMd">Md текст</ss-lib-text>
// 				<ss-lib-text [type]="TextType.BodySm">Sm текст</ss-lib-text>
// 				<ss-lib-text [type]="TextType.BodySm">Xs текст</ss-lib-text>
// 			</div>
// 		`,
// 		props: {
// 			TextType,
// 		},
// 	}),
// };

export const DifferentTypes: Story = {
	name: 'Разные размеры текста',
	args: {
		type: TextType.BodyMd,
		color: Colors.TextHeadings, // Добавляем цвет, чтобы работала темная тема
	},
	render: (args) => ({
		props: args,
		template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ss-lib-text [type]="type"  [color]="color">Xs Заголовок</ss-lib-text>
        <ss-lib-text [type]="type"  [color]="color">Xl текст</ss-lib-text>
        <ss-lib-text [type]="type" [color]="color">Lg текст</ss-lib-text>
        <ss-lib-text [type]="type" [color]="color">Md текст</ss-lib-text>
        <ss-lib-text [type]="type" [color]="color">Sm текст</ss-lib-text>
        <ss-lib-text [type]="type" [color]="color">Xs текст</ss-lib-text>
      </div>
    `,
	}),
};

export const DifferentWeights: Story = {
	render: () => ({
		template: `
			<div style="display: flex; flex-direction: column; gap: 16px;">
				<ss-lib-text [weight]="TextWeight.Regular">Regular текст</ss-lib-text>
				<ss-lib-text [weight]="TextWeight.Medium">Medium текст</ss-lib-text>
				<ss-lib-text [weight]="TextWeight.Semibold">SemiBold текст</ss-lib-text>
				<ss-lib-text [weight]="TextWeight.Bold">Bold текст</ss-lib-text>
			</div>
		`,
		props: {
			TextWeight,
		},
	}),
};

export const DifferentColors: Story = {
	render: () => ({
		template: `
			<div style="display: flex; flex-direction: column; gap: 16px;">
				
			    @for (colorToken of textColorsList; track $index) {
			    	<ss-lib-text [color]="Colors[colorToken]">
						Цвет текста с токеном цвета: {{colorToken}}
					</ss-lib-text>
			    }
			</div>
		`,
		props: {
			Colors,
			textColorsList,
		},
	}),
};

export const DifferentAlignments: Story = {
	render: () => ({
		template: `
			<div style="display: flex; flex-direction: column; gap: 16px;">
				<ss-lib-text [align]="Align.Start">Текст выровнен по левому краю</ss-lib-text>
				<ss-lib-text [align]="Align.Center">Текст выровнен по центру</ss-lib-text>
				<ss-lib-text [align]="Align.End">Текст выровнен по правому краю</ss-lib-text>
			</div>
		`,
		props: {
			Align,
		},
	}),
};

export const WithLineClamp: Story = {
	args: {
		isLineClamp: true,
		lineClampCount: 2,
	},
	render: (args) => ({
		props: args,
		template: `
			<div style="width: 300px;">
				<ss-lib-text
					[isLineClamp]="isLineClamp"
					[lineClampCount]="lineClampCount"
				>
					Это длинный текст, который будет обрезан после указанного количества строк. 
					Вы можете настроить количество строк с помощью параметра lineClampCount.
					Это длинный текст, который будет обрезан после указанного количества строк. 
					Вы можете настроить количество строк с помощью параметра lineClampCount.
				</ss-lib-text>
			</div>
		`,
	}),
};

export const WithEllipsis: Story = {
	args: {
		isEllipsis: true,
	},
	render: (args) => ({
		props: args,
		template: `
			<div style="width: 300px;">
				<ss-lib-text [isEllipsis]="isEllipsis">
					Это длинный текст, который будет обрезан с многоточием в конце, если не поместится в контейнер.
				</ss-lib-text>
			</div>
		`,
	}),
};

export const WithUnderline: Story = {
	args: {
		isUnderline: true,
	},
	render: (args) => ({
		props: args,
		template: `
			<ss-lib-text [isUnderline]="isUnderline">
				Этот текст подчеркнут
			</ss-lib-text>
		`,
	}),
};
