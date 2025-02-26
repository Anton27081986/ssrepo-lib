import { TemplateRef } from '@angular/core';
import { IModalConfig } from './modal-config';
import { IBadgeProps } from './badge-props';

export interface IModalData {
    title: string,
    description?: string | null,
    badgeProps?: IBadgeProps | null,
    contentRef?: TemplateRef<any> | undefined,
    footerRef?: TemplateRef<any> | undefined,
    modalConfig?: IModalConfig
}

export interface IConfirmData {
    title: string,
    description?: string | null,
    badgeProps?: IBadgeProps | null,
    footerRef?: TemplateRef<any> | undefined,
}