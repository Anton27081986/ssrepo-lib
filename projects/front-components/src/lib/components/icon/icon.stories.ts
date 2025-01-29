// icon.component.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { Colors, IconType } from 'front-components';

// Мета-информация о компоненте
const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: Object.values(IconType),
      description: 'Иконка',
    },
    height: {
      control: 'text',
      description: 'Высота, px',
    },
    width: {
      control: 'text',
      description: 'Ширина, px',
    },
    color: {
      control:'select',
      options: Object.values(Colors),
      description: 'Цвет иконки'
    },
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

// Базовый пример
export const Default: Story = {
  args: {
    icon: IconType.Bell,
    height: '24',
    width: '24',
    color: Colors.IconPrimary,
  },
};
