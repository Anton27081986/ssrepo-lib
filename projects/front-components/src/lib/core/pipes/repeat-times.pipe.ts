import { Pipe, PipeTransform } from '@angular/core';
import { clamp } from '../utils';

@Pipe({
    standalone: true,
    name: 'repeatTimes',
})
export class RepeatTimesPipe implements PipeTransform {
    public transform(n: number): number[] {
        return Array.from({length: clamp(n, 0, n)}, (_, i) => i);
    }
}