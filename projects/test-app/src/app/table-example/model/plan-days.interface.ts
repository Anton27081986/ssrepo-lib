export interface IPlanDays {
	id: number;
	operationalPlanId: number;
	planQuantity: number;
	factQuantity: number;
	date: string;
	isManufactoryOrder: boolean;
}
