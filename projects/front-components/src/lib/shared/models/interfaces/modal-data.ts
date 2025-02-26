import { IconType } from '../enums';
import { TemplateRef } from '@angular/core';
import { IModalConfig } from './modal-config';

export interface IModalData {
    title: string,
    description?: string | null,
    icon?: IconType | null,
    contentRef?: TemplateRef<any> | undefined,
    footerRef?: TemplateRef<any> | undefined,
    modalConfig?: IModalConfig
}