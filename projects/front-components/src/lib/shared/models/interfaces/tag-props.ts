import { Colors, TagType } from '../enums';

export interface ITagProps {
	type: TagType;
	text: string;
	dotColor?: Colors;
}
