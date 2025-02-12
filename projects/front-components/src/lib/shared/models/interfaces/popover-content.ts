import { OutputEmitterRef, TemplateRef } from '@angular/core';

export interface PopoverContent {
    templateRef: TemplateRef<any>;
    readonly closed: OutputEmitterRef<void>;
}