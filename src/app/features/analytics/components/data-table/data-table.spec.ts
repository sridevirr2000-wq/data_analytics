import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTable } from './data-table';
import { ExportService } from '../../services/export.service';

describe('DataTable', () => {
  let component: DataTable;
  let fixture: ComponentFixture<DataTable>;
  let mockExportService: jasmine.SpyObj<ExportService>;

  const mockRecords = [
    {
      id: '1',
      name: 'Alice',
      date: '01/10/2024',
      category: 'Sales',
      amount: 1000,
      status: 'completed'
    },
    {
      id: '2',
      name: 'Bob',
      date: '02/15/2024',
      category: 'Marketing',
      amount: 2000,
      status: 'pending'
    },
    {
      id: '3',
      name: 'Charlie',
      date: '03/20/2024',
      category: 'Support',
      amount: 1500,
      status: 'failed'
    }
  ];

  beforeEach(async () => {
    mockExportService = jasmine.createSpyObj('ExportService', ['exportToCsv']);

    await TestBed.configureTestingModule({
      imports: [DataTable],
      providers: [
        { provide: ExportService, useValue: mockExportService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTable);
    component = fixture.componentInstance;

    component.records = mockRecords as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter records by search term', () => {
    component.onSearchChange('alice');
    const result = component.filteredRecords();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Alice');
  });

  it('should reset page to 1 on search', () => {
    component.currentPage.set(3);
    component.onSearchChange('alice');
    expect(component.currentPage()).toBe(1);
  });

  it('should sort records ascending by amount', () => {
    component.onSort('amount');
    const result = component.sortedRecords();
    expect(result[0].amount).toBe(1000);
  });

  it('should toggle sort direction when same column clicked', () => {
    component.onSort('amount');
    component.onSort('amount');
    const result = component.sortedRecords();
    expect(result[0].amount).toBe(2000);
  });

  it('should return correct sort icon', () => {
    component.onSort('name');
    expect(component.getSortIcon('name')).toBe('↑');
    component.onSort('name');
    expect(component.getSortIcon('name')).toBe('↓');
  });

  it('should go to previous page', () => {
    component.currentPage.set(2);
    component.previousPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should call export service with formatted date', () => {
    component.exportToCsv();
    expect(mockExportService.exportToCsv).toHaveBeenCalled();
    const args = mockExportService.exportToCsv.calls.mostRecent().args[0];
    expect(args[0].date).toContain('="');
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('completed')).toBe('status-completed');
    expect(component.getStatusClass('pending')).toBe('status-pending');
    expect(component.getStatusClass('failed')).toBe('status-failed');
  });

  it('should calculate start record correctly', () => {
    component.currentPage.set(2);
    component.rowsPerPage = 10;
    expect(component.getStartRecord()).toBe(11);
  });

  it('should calculate end record correctly', () => {
    component.currentPage.set(1);
    component.rowsPerPage = 2;
    expect(component.getEndRecord()).toBe(2);
  });

});
