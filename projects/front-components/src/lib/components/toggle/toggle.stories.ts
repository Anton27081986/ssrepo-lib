import { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';
import { signal } from '@angular/core';

// Мета-информация о компоненте
const meta: Meta<ToggleComponent> = {
    title: 'Components/Toggle',
    component: ToggleComponent,
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Переключить',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Заблокировать',
        },
    },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

// Базовый пример
export const Default: Story = {
    args: {
        checked: signal<boolean>(false),
        isDisabled: signal<boolean>(false),
    },
};

