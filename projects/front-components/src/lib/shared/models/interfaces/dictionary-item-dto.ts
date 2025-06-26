import { IId } from './i-id';

export interface IDictionaryItemDto extends IId {
	name: string;
	linkToDetail?: string | null;
	parentId?: number;
}
