import { Component } from '@angular/core';
import { ScrollbarComponent } from '../../../lib/components/scrollbar/scrollbar.component';

@Component({
	selector: 'ss-lib-scrollbar-wrapper',
	standalone: true,
	imports: [ScrollbarComponent],
	template: `
		<ss-lib-scrollbar style="width: 300px; height: 200px; overflow: auto;">
			<div style="width: 600px; height: 400px; padding: 20px;">
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
				<p>Это контент для демонстрации скроллбара.</p>
			</div>
		</ss-lib-scrollbar>
	`,
})
export class ScrollbarWrapperComponent {}
