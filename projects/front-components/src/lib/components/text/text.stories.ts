import { Meta, StoryObj } from '@storybook/angular';
import { TextType, TextWeight, Colors } from '../../models';
import { TextComponent } from './text.component';

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

// Базовый пример
export const Default: Story = {
    args: {
        type: TextType.BodyMd,
        weight: TextWeight.Regular,
        color: Colors.TextPrimary,
        isEllipsis: false,
    },
    render: (args) => ({
        component: TextComponent,
        props: args,
        template: `<snab-text [type]="type" [weight]="weight" [color]="color" [isEllipsis]="isEllipsis">Это текст с базовым стилем.</snab-text>`,
    }),
};

// Пример с добавлением троеточия
export const EllipsisText: Story = {
    args: {
        type: TextType.BodyMd,
        weight: TextWeight.Regular,
        color: Colors.TextPrimary,
        isEllipsis: true,
    },
    render: (args) => ({
        component: TextComponent,
        props: args,
        template: `<snab-text [type]="type" [weight]="weight" [color]="color" [isEllipsis]="isEllipsis">Этот текст будет обрезан с троеточием, если он слишком длинный.</snab-text>`,
    }),
};
