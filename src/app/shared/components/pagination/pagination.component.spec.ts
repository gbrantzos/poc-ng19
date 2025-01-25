import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { EMPTY_PAGING, PaginationComponent, PagingInfo } from './pagination.component';

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

  it('should show correct summary and arrows', async () => {
    const { debugElement, fixture } = await setup();
    const summary = debugElement.query(By.css('#summary'));
    const pageSize = debugElement.query(By.css('#pageSize'));
    const arFirst = debugElement.query(By.css('#first'));
    const arPrev = debugElement.query(By.css('#prev'));
    const arNext = debugElement.query(By.css('#next'));
    const arLast = debugElement.query(By.css('#last'));

    // Normal case, first page
    fixture.componentRef.setInput('pagingInfo', {
      totalRows: 256,
      pageSize: 50,
      current: 1
    } as PagingInfo);
    fixture.detectChanges();
    expect(summary.nativeElement.innerHTML).toEqual('Showing 1-50 of 256 rows');
    expect(pageSize.nativeElement.innerHTML).toEqual('50 rows per page');
    expect(arFirst.nativeElement.classList).toContain('disabled');
    expect(arPrev.nativeElement.classList).toContain('disabled');
    expect(arNext.nativeElement.classList).not.toContain('disabled');
    expect(arLast.nativeElement.classList).not.toContain('disabled');

    // Normal case, second page
    fixture.componentRef.setInput('pagingInfo', {
      totalRows: 4654,
      pageSize: 30,
      current: 3
    } as PagingInfo);
    fixture.detectChanges();
    expect(summary.nativeElement.innerHTML).toEqual('Showing 61-90 of 4654 rows');
    expect(pageSize.nativeElement.innerHTML).toEqual('30 rows per page');
    expect(arFirst.nativeElement.classList).not.toContain('disabled');
    expect(arPrev.nativeElement.classList).not.toContain('disabled');
    expect(arNext.nativeElement.classList).not.toContain('disabled');
    expect(arLast.nativeElement.classList).not.toContain('disabled');

    // Normal case, last page
    fixture.componentRef.setInput('pagingInfo', {
      totalRows: 256,
      pageSize: 50,
      current: 6
    } as PagingInfo);
    fixture.detectChanges();
    expect(summary.nativeElement.innerHTML).toEqual('Showing 251-256 of 256 rows');
    expect(pageSize.nativeElement.innerHTML).toEqual('50 rows per page');
    expect(arFirst.nativeElement.classList).not.toContain('disabled');
    expect(arPrev.nativeElement.classList).not.toContain('disabled');
    expect(arNext.nativeElement.classList).toContain('disabled');
    expect(arLast.nativeElement.classList).toContain('disabled');

    // Results less than page size
    fixture.componentRef.setInput('pagingInfo', {
      totalRows: 26,
      pageSize: 50,
      current: 1
    } as PagingInfo);
    fixture.detectChanges();
    expect(summary.nativeElement.innerHTML).toEqual('Showing 1-26 rows');
    expect(pageSize.nativeElement.innerHTML).toEqual('50 rows per page');

    // Invalid current page, silently convert to page 1
    fixture.componentRef.setInput('pagingInfo', {
      totalRows: 46,
      pageSize: 70,
      current: 12
    } as PagingInfo);
    fixture.detectChanges();
    expect(summary.nativeElement.innerHTML).toEqual('Showing 1-46 rows');
    expect(pageSize.nativeElement.innerHTML).toEqual('70 rows per page');
  });
});
