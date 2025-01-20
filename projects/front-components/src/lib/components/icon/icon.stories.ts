// icon.component.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { IconType } from '../../models/enums/icon-type';
import { withDesign } from 'storybook-addon-designs';

// Мета-информация о компоненте
const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  decorators: [withDesign],
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: Object.values(IconType),
      description: ' Текст в label',
    },
    height: {
      control: 'text',
      description: ' Текст в label',
    },
    width: {
      control: 'text',
      description: ' Текст в label',
    },
    color: {
      control: 'color',
      description: ' Текст в label',
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
    color: 'black',
  },
};
