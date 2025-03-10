import { OutputEmitterRef, Signal, TemplateRef } from '@angular/core';

export interface PopoverContent {
    templateRef: Signal<TemplateRef<any>>;
    readonly closed: OutputEmitterRef<void>;
    readonly value: OutputEmitterRef<unknown | null>;
}