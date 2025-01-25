import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type PagingInfo = {
  current: number;
  pageSize: number;
  totalRows: number;
};
export const EMPTY_PAGING: PagingInfo = {
  current: 0,
  pageSize: 0,
  totalRows: 0
};

export type PagingEvent = {
  pageNumber: number;
  pageSize: number;
};

type Arrow = 'first' | 'prev' | 'next' | 'last';

@Component({
  selector: 'poc-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styles: `
    i.ph {
      display: inline-block;
      height: 8px !important;
      line-height: 8px !important;
      margin-top: 1px;
      cursor: pointer;
    }

    .disabled {
      @apply opacity-25 cursor-not-allowed #{!important};
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mt-1 pt-1 pl-1 border-t-2 flex text-sm gap-6 text-center' }
})
export class PaginationComponent {
  pagingInfo = input.required<PagingInfo>();
  pagingChanged = output<PagingEvent>();

  pageSize = computed(() => (this.pagingInfo().pageSize == 0 ? 25 : this.pagingInfo().pageSize));
  summary = computed(() => {
    const pagingInfo = this.pagingInfo();

    if (pagingInfo.totalRows === 0) {
      return 'No rows displayed';
    }

    let summary = '';
    const current = pagingInfo.totalRows >= pagingInfo.pageSize ? pagingInfo.current : 1;
    const startRow = pagingInfo.pageSize * (current - 1) + 1;
    const lastRow =
      pagingInfo.pageSize * current > pagingInfo.totalRows ? pagingInfo.totalRows : pagingInfo.pageSize * current;
    summary = `Showing ${startRow}`;
    summary +=
      pagingInfo.pageSize < pagingInfo.totalRows
        ? `-${lastRow} of ${pagingInfo.totalRows} rows`
        : `-${pagingInfo.totalRows} rows`;

    return summary;
  });
  arrowsState = computed(() => {
    const pagingInfo = this.pagingInfo();

    const multiPages = pagingInfo.totalRows > pagingInfo.pageSize;
    const lastPage = Math.ceil(pagingInfo.totalRows / pagingInfo.pageSize);
    return {
      first: multiPages && pagingInfo.current > 1,
      prev: multiPages && pagingInfo.current > 1,
      next: multiPages && pagingInfo.current < lastPage,
      last: multiPages && pagingInfo.current < lastPage
    };
  });

  onArrowClick(arrow: Arrow) {
    const pagingInfo = this.pagingInfo();
    const arrowState = this.arrowsState();
    if (!arrowState[arrow]) {
      return;
    }

    const lastPage = Math.ceil(pagingInfo.totalRows / pagingInfo.pageSize);
    let pageNumber = 0;

    switch (arrow) {
      case 'first':
        pageNumber = 1;
        break;
      case 'next':
        pageNumber = pagingInfo.current + 1;
        break;
      case 'prev':
        pageNumber = pagingInfo.current - 1;
        break;
      case 'last':
        pageNumber = lastPage;
        break;
    }

    if (pageNumber < 1) {
      pageNumber = 1;
    }
    if (pageNumber > lastPage) {
      pageNumber = lastPage;
    }

    this.pagingChanged.emit({
      pageNumber: pageNumber,
      pageSize: pagingInfo.pageSize
    });
  }
}
