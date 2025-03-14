import type { OutputEmitterRef, Signal, TemplateRef } from '@angular/core';

export interface PopoverContent {
	templateRef: Signal<TemplateRef<unknown>>;
	readonly closed: OutputEmitterRef<void>;
	readonly value: OutputEmitterRef<unknown | null>;
}
