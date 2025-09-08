import { IOperationPlanItem } from '../model/oper-plan.interface';
import { TableColumnConfig } from '../../../../../../front-components/src/lib/components/table/models';

export function generateColumnOperPlanConfig(
	data: IOperationPlanItem[],
): TableColumnConfig[] {
	// Базовые колонки, не зависящие от дат
	const baseColumns: TableColumnConfig[] = [
		{
			id: 'tov',
			name: 'Готовая продукция (ГП)',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
			stickyColumn: true,
		},
		{
			id: 'tovCategory',
			name: 'Категория',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
			stickyColumn: true,
		},
		{
			id: 'productionSection',
			name: 'Участок',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'optimalBatch',
			name: 'Оптимальная партия, КГ',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'productionType',
			name: 'Тип продукции',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'productionCity',
			name: 'Город',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'productManagerUser',
			name: 'Менеджер ТМЗ',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'planEcomonicUser',
			name: 'Менеджер ПЭО',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
	];

	// Собираем уникальные даты из planDays
	const uniqueDates = new Set<string>();

	data.forEach((item) => {
		item.planDays.forEach((day) => {
			const date = new Date(day.date)
				.toISOString()
				.split('T')[0]
				.slice(5); // Формат MM-DD

			uniqueDates.add(date);
		});
	});

	// Создаем группу колонок для недели
	const weekColumn: TableColumnConfig = {
		id: 'planDays',
		name: 'Неделя',
		showInDropdown: true,
		showInHeader: false,
		visible: true,
		subGroups: Array.from(uniqueDates).map((date) => `week-${date}`),
	};

	// Создаем колонки для каждой даты
	const dateColumns: TableColumnConfig[] = Array.from(uniqueDates).flatMap(
		(date) => [
			{
				id: `week-${date}`,
				name: date,
				showInDropdown: false,
				showInHeader: true,
				visible: true,
				subColumns: [`planQuantity-${date}`, `factQuantity-${date}`],
			},
			{
				id: `planQuantity-${date}`,
				name: 'План',
				showInDropdown: false,
				showInHeader: true,
				visible: true,
			},
			{
				id: `factQuantity-${date}`,
				name: 'Факт',
				showInDropdown: false,
				showInHeader: true,
				visible: true,
			},
		],
	);

	// Колонки для итогов по неделе и месяцу
	const summaryColumns: TableColumnConfig[] = [
		{
			id: 'weekPlanQuantity',
			name: 'План (нед)',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'weekFactQuantity',
			name: 'Факт (нед)',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'monthPlanQuantity',
			name: 'План (мес)',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
		{
			id: 'monthFactQuantity',
			name: 'Факт (мес)',
			showInDropdown: true,
			showInHeader: true,
			visible: true,
		},
	];

	return [...baseColumns, weekColumn, ...dateColumns, ...summaryColumns];
}
