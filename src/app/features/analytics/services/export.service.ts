import { Injectable } from '@angular/core';
import { TableRecord } from '../../../shared/models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  exportToCsv(data: TableRecord[], filename: string): void {
    // Convert data to CSV format
    const headers = ['ID', 'Name', 'Date', 'Category', 'Amount', 'Status'];
    const csvRows = [
      headers.join(','),
      ...data.map(record => [
        record.id,
        `"${record.name}"`,
        record.date,
        record.category,
        record.amount,
        record.status
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
