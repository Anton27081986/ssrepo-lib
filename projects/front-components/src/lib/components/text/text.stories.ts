import type { Meta, StoryObj } from '@storybook/angular';
import { TextComponent } from './text.component';
import { Colors, TextType, TextWeight } from '../../shared/models';

// Мета-информация о компоненте
const meta: Meta<TextComponent> = {
	title: 'Components/Text',
	component: TextComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: Object.values(TextType),
			description: 'Тип текста',
		},
		weight: {
			control: 'select',
			options: Object.values(TextWeight),
			description: 'Толщина шрифта',
		},
		color: {
			control: 'select',
			options: Object.values(Colors),
			description: 'Цвет текста',
		},
		isEllipsis: {
			control: 'boolean',
			description: 'Добавлять троеточие при переполнении',
		},
	},
};

export default meta;

type Story = StoryObj<TextComponent>;

// // Базовый пример
// export const Default: Story = {
//     args: {
//         type: TextType.BodyMd,
//         weight: TextWeight.Regular,
//         color: Colors.TextInformation,
//         isEllipsis: false,
//     },
//     render: (args) => ({
//         component: TextComponent,
//         props: args,
//         template: `<ss-lib-text [type]="type" [weight]="weight" [color]="color" [isEllipsis]="isEllipsis">Это текст с базовым стилем.</ss-lib-text>`,
//     }),
// };
//
// // Пример с добавлением троеточия
// export const EllipsisText: Story = {
//     args: {
//         type: TextType.BodyMd,
//         weight: TextWeight.Regular,
//         color: Colors.TextInformation,
//         isEllipsis: true,
//     },
//     render: (args) => ({
//         component: TextComponent,
//         props: args,
//         template: `<ss-lib-text [type]="type" [weight]="weight" [color]="color" [isEllipsis]="isEllipsis">Этот текст будет обрезан с троеточием, если он слишком длинный.</ss-lib-text>`,
//     }),
// };
