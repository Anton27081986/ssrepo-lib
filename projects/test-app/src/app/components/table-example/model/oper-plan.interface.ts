import { IName } from './name.interface';
import { IPlanDays } from './plan-days.interface';

export interface IOperationPlanItems {
	id: number;
	weekId: number;
	tov: IName;
	tovCategory: IName;
	productionSection: IName;
	optimalBatch: number;
	productionType: IName;
	productionCity: IName;
	productManagerUser: IName;
	planEcomonicUser: IName;
	isPersonification: boolean;
	isComment: boolean;
	planDays: IPlanDays[];
	monthPlanQuantity: number;
	monthFactQuantity: number;
	weekPlanQuantity: number;
	weekFactQuantity: number;
}
