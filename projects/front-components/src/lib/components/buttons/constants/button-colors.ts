import { InjectionToken } from '@angular/core';
import { IButtonColors } from '../models';

export const BUTTON_COLORS = new InjectionToken<IButtonColors>(
    'abstraction over button colors',
);