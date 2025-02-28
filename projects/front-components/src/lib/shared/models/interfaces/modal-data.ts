import { TemplateRef } from '@angular/core';
import { IModalConfig } from './modal-config';
import { IBadgeProps } from './badge-props';

export interface IModalData {
    title: string,
    description?: string | undefined,
    badgeProps?: IBadgeProps | undefined,
    contentRef?: TemplateRef<any> | undefined,
    footerRef?: TemplateRef<any> | undefined,
    modalConfig?: IModalConfig
}

export interface IConfirmData {
    title: string;
    description?: string;
    badgeProps?: IBadgeProps;
    yes?: string,
    no?: string,
}