import { OutputEmitterRef, TemplateRef } from '@angular/core';
import { IDictionaryItemDto } from './dictionary-item-dto';

export interface PopoverContent {
    templateRef: TemplateRef<any>;
    readonly closed: OutputEmitterRef<void>;
    readonly value: OutputEmitterRef<IDictionaryItemDto | null>;
}