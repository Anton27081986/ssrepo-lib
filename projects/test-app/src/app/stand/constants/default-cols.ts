import { IStoreTableBaseColumn } from '../../../../../front-components/src/lib/shared/models';
import { Shape } from '../../../../../front-components/src/lib/shared/models';
import { BannerRowItemField } from '../../example-table-tr/example-table-tr.component';

export const DEFAULT_COLS: IStoreTableBaseColumn[] = [
	{
		id: BannerRowItemField.dragAction,
		title: '',
		order: 0,
		width: '40px',
		// height: '84px',
		align: 'center',
		padding: '12px 10px',
		sticky: false,
		skeleton: {
			header: {
				width: '20px',
				height: '20px',
				type: Shape.Round,
			},
			body: {
				width: '20px',
				height: '20px',
				type: Shape.Round,
			},
		},
	},
	{
		id: BannerRowItemField.order,
		title: 'Порядок',
		order: 1,
		width: '51px',
		align: 'center',
		padding: '12px 12px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '10px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '20px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.image,
		title: 'Изображение',
		order: 2,
		width: '180px',
		align: 'left',
		padding: '14px 24px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.banner,
		title: 'Баннер',
		order: 3,
		align: 'left',
		padding: '12px 24px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.status,
		title: 'Опубликовано',
		order: 4,
		width: '85px',
		align: 'center',
		padding: '12px 24px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.actionToggle,
		title: 'Действие',
		order: 5,
		width: null,
		align: 'left',
		padding: '12px 24px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.user,
		title: 'Пользователь',
		order: 6,
		width: null,
		align: 'center',
		padding: '12px 24px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.period,
		title: 'Период',
		order: 7,
		width: null,
		align: 'left',
		padding: '12px 24px',
		sticky: false,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
	{
		id: BannerRowItemField.action,
		title: '',
		order: 7,
		width: '40px',
		align: 'left',
		padding: '12px 10px',
		sticky: true,
		skeleton: {
			header: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
			body: {
				width: '100px',
				height: '50px',
				type: Shape.Square,
			},
		},
	},
];
