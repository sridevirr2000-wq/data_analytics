import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';
import { KpiCard } from '../kpi-card/kpi-card';
import { DateRangeFilter } from '../date-range-filter/date-range-filter';
import { LineChart } from '../charts/line-chart/line-chart';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { DoughnutChart } from '../charts/doughnut-chart/doughnut-chart';
import { DataTable } from '../data-table/data-table';
import { DateRange } from '../../../../shared/models/analytics.model';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    CommonModule,
    KpiCard,
    DateRangeFilter,
    LineChart,
    BarChart,
    DoughnutChart,
    DataTable
  ],
  templateUrl: './dashboard-container.html',
  styleUrl: './dashboard-container.scss',
})
export class DashboardContainer {
  private analyticsService = inject(AnalyticsService);

  dateRange = this.analyticsService.dateRange;
  dashboardData = this.analyticsService.dashboardData;

  onDateRangeChange(range: DateRange): void {
    this.analyticsService.setDateRange(range);
  }

}
