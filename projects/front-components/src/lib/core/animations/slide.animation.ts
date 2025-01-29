import { animate, style, transition, trigger } from '@angular/animations';
import { DURATION } from './animation';

export const slideInOut = trigger('slideInOut', [
    transition(':leave', [
        animate(`${DURATION}ms ease-out`, style({transform: 'translateX(100%)', opacity: 0})) // Slide out to the right
    ])
]);
