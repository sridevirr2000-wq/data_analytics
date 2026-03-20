import { Component, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableRecord } from '../../../../shared/models/analytics.model';
import { ExportService } from '../../services/export.service';

type SortColumn = keyof TableRecord | null;
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  @Input({ required: true }) records!: TableRecord[];
  
  private exportService = inject(ExportService);

  searchTerm = signal<string>('');
  sortColumn = signal<SortColumn>(null);
  sortDirection = signal<SortDirection>('asc');
  currentPage = signal<number>(1);
  rowsPerPage = 10;

  filteredRecords = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.records;

    return this.records.filter(record => this.doesRecordMatchTerm(record, term));
  });

  sortedRecords = computed(() => {
    const records = [...this.filteredRecords()];
    const column = this.sortColumn();
    
    if (!column) return records;

    return records.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];
      const direction = this.sortDirection() === 'asc' ? 1 : -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * direction;
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * direction;
      }

      return 0;
    });
  });

  paginatedRecords = computed(() => {
    const start = (this.currentPage() - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.sortedRecords().slice(start, end);
  });

  totalPages = computed(() => 
    Math.ceil(this.sortedRecords().length / this.rowsPerPage)
  );

  private doesRecordMatchTerm(record: TableRecord, term: string): boolean {
    const dateText = String(record.date).toLowerCase();
    const fields = [
      record.name.toLowerCase(),
      record.category.toLowerCase(),
      record.status.toLowerCase()
    ];

    return fields.some(value => value.includes(term)) ? true : dateText.includes(term);
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  onSort(column: SortColumn): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(column: SortColumn): string {
    console.log("varudhuu", column, this.sortColumn(), this.sortDirection());
    if (this.sortColumn() !== column) return '';
    return this.sortDirection() === 'asc' ? "/assets/icons/arrow_up.svg"
    : "/assets/icons/arrow_down.svg";
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  private formatDateForExport(date: string): string {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  exportToCsv(): void {
    const modifiedData = this.filteredRecords().map(record => ({
    ...record,
    date: `="${this.formatDateForExport(record.date)}"`
  }));

  this.exportService.exportToCsv(modifiedData, 'analytics-data.csv');
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'completed': 'status-completed',
      'pending': 'status-pending',
      'failed': 'status-failed'
    };
    return classes[status] || '';
  }

  getStartRecord(): number {
    return (this.currentPage() - 1) * this.rowsPerPage + 1;
  }

  getEndRecord(): number {
    return Math.min(this.currentPage() * this.rowsPerPage, this.sortedRecords().length);
  }

}
