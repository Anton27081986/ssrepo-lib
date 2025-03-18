import type { SkeletonConf } from './skeleton.conf';
import { AlignType } from '../types/align-type';

export interface IStoreTableId {
	id: string;
}

export interface IBaseParamsStoreTable extends IStoreTableId {
	order: number;
	readonly width?: string | null;
	readonly align: AlignType;
	padding: string | null;
	sticky: boolean;
}

export interface IStoreTableBase extends IBaseParamsStoreTable {
	readonly title: string;
	disableChange?: boolean;
	skeleton: ISkeletonTableBaseColumn;
}

export interface IStoreTableBaseColumn extends IStoreTableBase {
	readonly sort?: boolean | null;
	readonly sortType?: string | null;
}

export interface ISkeletonTableBaseColumn {
	header: SkeletonConf;
	body: SkeletonConf;
}

export interface ISkeletonDerivativeThColumn extends IBaseParamsStoreTable {
	skeletonTh: SkeletonConf;
}

export interface ISkeletonDerivativeTrTable {
	items: ISkeletonDerivativeTdTable[];
}

export interface ISkeletonDerivativeTdTable extends IBaseParamsStoreTable {
	skeletonConfig: SkeletonConf;
}
