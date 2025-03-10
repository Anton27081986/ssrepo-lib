import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { CalendarSheetPipe } from '../../pipes';
import { ButtonComponent } from '../../../buttons';
import { MapperPipe, RepeatTimesPipe } from '../../../../core/pipes';

export const calendarSheetImports = [
	CalendarSheetPipe,
	RepeatTimesPipe,
	MapperPipe,
	ButtonComponent,
	CalendarCellComponent,
];
