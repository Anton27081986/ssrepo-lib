import type { SkeletonConf } from "./skeleton.conf";

export interface IStoreTableId {
	id: string;
}

export interface IStoreTableBase extends IStoreTableId {
	readonly title: string;
	order: number;
	disableChange?: boolean;
	readonly width?: string | null;
	skeleton: ISkeletonTableBaseColumn;
}

export interface IStoreTableBaseColumn extends IStoreTableBase {
	readonly sort?: boolean | null;
	readonly sortType?: string | null;
	readonly align?: string | null;
}

export interface ISkeletonTableBaseColumn {
	header: SkeletonConf;
	body: SkeletonConf;
}

export interface ISkeletonDerivativeThColumn extends IStoreTableId {
	width?: null | string;
	skeletonTh: SkeletonConf;
	order: number;
}

export interface ISkeletonDerivativeTrTable {
	items: ISkeletonDerivativeTdTable[];
}

export interface ISkeletonDerivativeTdTable extends IStoreTableId {
	order: number;
	skeletonConfig: SkeletonConf;
}
