import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRange } from '../../../../shared/models/analytics.model';

@Component({
  selector: 'app-date-range-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-range-filter.html',
  styleUrl: './date-range-filter.scss',
})
export class DateRangeFilter {
  @Input({ required: true }) selectedRange!: DateRange;
  @Output() rangeChanged = new EventEmitter<DateRange>();

  readonly ranges: DateRange[] = ['week', 'month', 'year'];

  onRangeSelect(range: DateRange): void {
    this.rangeChanged.emit(range);
  }

}
