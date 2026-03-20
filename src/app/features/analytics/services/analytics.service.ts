import { Injectable, signal, computed } from '@angular/core';
import {
  AnalyticsDashboard,
  DateRange,
  KPI,
  ChartDataPoint,
  TableRecord,
  TransactionStatus
} from '../../../shared/models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private dateRangeSignal = signal<DateRange>('month');
  private tableDataSignal = signal<TableRecord[]>(this.generateTableData());

  readonly dateRange = this.dateRangeSignal.asReadonly();
  readonly tableData = this.tableDataSignal.asReadonly();
  
  readonly dashboardData = computed(() => {
    return this.buildDashboardData(this.dateRangeSignal());
  });

  setDateRange(range: DateRange): void {
    this.dateRangeSignal.set(range);
  }

  private generateTableData(): TableRecord[] {
    const categories = ['Sales', 'Marketing', 'Support', 'Product', 'Engineering'];
    const statuses: TransactionStatus[] = ['completed', 'pending', 'failed'];
    const names = [
      'Sridevi', 'Rajesh', 'Priya', 'Amit', 'Anjali', 'Vikram', 'Neha', 'Anand', 'Sneha', 'Rohit',
      'Ramesh', 'Srinithi', 'Meera', 'Ravi', 'Anita', 'Karan', 'Divya', 'Sanjay', 'Pooja', 'Vijay', 'Asha',
      'Rythm', 'Rani', 'Raj', 'Anil', 'Sunita', 'Vishal', 'Kavya', 'Rahul', 'Aarti', 'Manish', 'Sonal', 'Deepak',
      'Manjukesh', 'Ajay'
    ];

    const formatDate = (d: Date) => {
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    };

    return Array.from({ length: 35 }, (_, i) => {
      const date = new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1);
      return {
        id: `${i + 1}`,
        name: names[i],
        date: formatDate(date),
        category: categories[Math.floor(Math.random() * categories.length)],
        amount: Math.floor(Math.random() * 5000) + 500,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });
  }

  private buildDashboardData(range: DateRange): AnalyticsDashboard {
    return {
      kpis: this.getKPIs(range),
      lineChartData: this.getLineChartData(range),
      barChartData: this.getBarChartData(range),
      doughnutChartData: this.getDoughnutChartData(),
      tableRecords: this.tableDataSignal()
    };
  }

  private getKPIs(range: DateRange): KPI[] {
    const baseData = {
      week: { users: 8543, revenue: 23450, conversion: 2.8 },
      month: { users: 12543, revenue: 45230, conversion: 3.4 },
      year: { users: 145680, revenue: 542300, conversion: 4.2 }
    };

    const data = baseData[range];

    return [
      {
        title: 'Total Users',
        value: data.users.toLocaleString(),
        change: range === 'week' ? 8.5 : range === 'month' ? 12.5 : 18.3,
        isPositive: true,
        icon: 'users',
        color: 'indigo'
      },
      {
        title: 'Revenue',
        value: `$${data.revenue.toLocaleString()}`,
        change: range === 'week' ? 5.2 : range === 'month' ? 8.3 : 15.7,
        isPositive: true,
        icon: 'dollar',
        color: 'green'
      },
      {
        title: 'Conversion Rate',
        value: `${data.conversion}%`,
        change: range === 'week' ? -0.3 : range === 'month' ? -0.5 : 0.8,
        isPositive: range === 'year',
        icon: 'trending',
        color: 'purple'
      }
    ];
  }

  private getLineChartData(range: DateRange): ChartDataPoint[] {
    switch (range) {
      case 'week':
        return [
          { label: 'Mon', value: 1200 },
          { label: 'Tue', value: 1450 },
          { label: 'Wed', value: 1350 },
          { label: 'Thu', value: 1680 },
          { label: 'Fri', value: 1820 },
          { label: 'Sat', value: 1590 },
          { label: 'Sun', value: 1450 }
        ];
      case 'month':
        return [
          { label: 'Week 1', value: 8500 },
          { label: 'Week 2', value: 9200 },
          { label: 'Week 3', value: 8800 },
          { label: 'Week 4', value: 10200 }
        ];
      case 'year':
      default:
        return [
          { label: 'Jan', value: 4200 }, { label: 'Feb', value: 5100 },
          { label: 'Mar', value: 4800 }, { label: 'Apr', value: 5900 },
          { label: 'May', value: 6200 }, { label: 'Jun', value: 5800 },
          { label: 'Jul', value: 6500 }, { label: 'Aug', value: 7100 },
          { label: 'Sep', value: 6800 }, { label: 'Oct', value: 7500 },
          { label: 'Nov', value: 8200 }, { label: 'Dec', value: 8900 }
        ];
    }
  }

  private getBarChartData(range: DateRange): ChartDataPoint[] {
    switch (range) {
      case 'week':
        return [
          { label: 'Mon', Sales: 850, Marketing: 620, Support: 340 },
          { label: 'Tue', Sales: 920, Marketing: 680, Support: 380 },
          { label: 'Wed', Sales: 880, Marketing: 590, Support: 310 },
          { label: 'Thu', Sales: 1050, Marketing: 720, Support: 420 },
          { label: 'Fri', Sales: 1120, Marketing: 780, Support: 450 },
          { label: 'Sat', Sales: 950, Marketing: 650, Support: 380 },
          { label: 'Sun', Sales: 890, Marketing: 610, Support: 350 }
        ];
      case 'month':
        return [
          { label: 'Week 1', Sales: 3200, Marketing: 2100, Support: 1400 },
          { label: 'Week 2', Sales: 3500, Marketing: 2300, Support: 1500 },
          { label: 'Week 3', Sales: 3300, Marketing: 2200, Support: 1450 },
          { label: 'Week 4', Sales: 3800, Marketing: 2500, Support: 1600 }
        ];
      case 'year':
      default:
        return [
          { label: 'Q1', Sales: 12500, Marketing: 8200, Support: 5300 },
          { label: 'Q2', Sales: 14200, Marketing: 9100, Support: 5900 },
          { label: 'Q3', Sales: 15800, Marketing: 10200, Support: 6400 },
          { label: 'Q4', Sales: 17500, Marketing: 11300, Support: 7100 }
        ];
    }
  }

  private getDoughnutChartData(): ChartDataPoint[] {
    return [
      { label: 'Desktop', value: 45 },
      { label: 'Mobile', value: 35 },
      { label: 'Tablet', value: 15 },
      { label: 'Other', value: 5 }
    ];
  }

}
