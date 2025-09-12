import { TagType } from '../enums';
import { ITagColorConfig } from './tag-color-config';

export interface ITagProps {
	type: TagType;
	text: string;
	colorConfig?: ITagColorConfig;
}
