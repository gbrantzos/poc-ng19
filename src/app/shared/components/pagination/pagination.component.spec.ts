import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { EMPTY_PAGING, PaginationComponent } from './pagination.component';

const testCases = [
  {
    description: 'normal case, first page',
    pagingInfo: {
      totalRows: 256,
      pageSize: 50,
      current: 1
    },
    summaryText: 'Showing 1-50 of 256 rows',
    rowsPerPageText: '50 rows per page',
    arrowsState: { first: true, prev: true, next: false, last: false }
  },
  {
    description: 'normal case, second page',
    pagingInfo: {
      totalRows: 4654,
      pageSize: 30,
      current: 3
    },
    summaryText: 'Showing 61-90 of 4654 rows',
    rowsPerPageText: '30 rows per page',
    arrowsState: { first: false, prev: false, next: false, last: false }
  },
  {
    description: 'normal case, last page',
    pagingInfo: {
      totalRows: 256,
      pageSize: 50,
      current: 6
    },
    summaryText: 'Showing 251-256 of 256 rows',
    rowsPerPageText: '50 rows per page',
    arrowsState: { first: false, prev: false, next: true, last: true }
  },
  {
    description: 'results less than page size',
    pagingInfo: {
      totalRows: 26,
      pageSize: 50,
      current: 1
    },
    summaryText: 'Showing 1-26 rows',
    rowsPerPageText: '50 rows per page',
    arrowsState: { first: true, prev: true, next: true, last: true }
  },
  {
    description: 'invalid current page, silently convert to page 1',
    pagingInfo: {
      totalRows: 46,
      pageSize: 70,
      current: 12
    },
    summaryText: 'Showing 1-46 rows',
    rowsPerPageText: '70 rows per page',
    arrowsState: { first: true, prev: true, next: true, last: true }
  }
];

describe('PaginationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('pagingInfo', EMPTY_PAGING);
    fixture.detectChanges();

    return { fixture, debugElement: fixture.debugElement, component };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should show no rows found', async () => {
    const { debugElement } = await setup();
    const summary = debugElement.query(By.css('#summary'));

    expect(summary.nativeElement.innerHTML).toEqual('No rows displayed');
  });

  testCases.forEach(({ pagingInfo, summaryText, rowsPerPageText, arrowsState, description }) => {
    it(`should show correct summary and arrows - ${description}`, async () => {
      const { debugElement, fixture } = await setup();
      const summary = debugElement.query(By.css('#summary'));
      const pageSize = debugElement.query(By.css('#pageSize'));
      const arrowFirst = debugElement.query(By.css('#first'));
      const arrowPrev = debugElement.query(By.css('#prev'));
      const arrowNext = debugElement.query(By.css('#next'));
      const arrowLast = debugElement.query(By.css('#last'));

      fixture.componentRef.setInput('pagingInfo', pagingInfo);
      fixture.detectChanges();
      expect(summary.nativeElement.innerHTML).toEqual(summaryText);
      expect(pageSize.nativeElement.innerHTML).toEqual(rowsPerPageText);
      expect(arrowFirst.nativeElement.classList.contains('disabled')).toBe(arrowsState.first);
      expect(arrowPrev.nativeElement.classList.contains('disabled')).toBe(arrowsState.prev);
      expect(arrowNext.nativeElement.classList.contains('disabled')).toBe(arrowsState.next);
      expect(arrowLast.nativeElement.classList.contains('disabled')).toBe(arrowsState.last);
    });
  });
});
