import { OutputEmitterRef, Signal, TemplateRef } from '@angular/core';
import { IDictionaryItemDto } from './dictionary-item-dto';

export interface PopoverContent {
    templateRef: Signal<TemplateRef<any>>;
    readonly closed: OutputEmitterRef<void>;
    readonly value: OutputEmitterRef<IDictionaryItemDto | null>;
}