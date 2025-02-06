import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Action } from '@poc/shared/components/toolbar/toolbar.component';
import { NgClass } from '@angular/common';

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

// eslint-disable-next-line no-magic-numbers
const DEFAULT_SIZES = [10, 25, 50, 100];
const DEFAULT_SIZE = 25;

@Component({
  selector: 'poc-pagination',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, NgClass],
  templateUrl: './pagination.component.html',
  styles: `
    i.fa-solid {
      display: inline-block;
      cursor: pointer;
      transform: scale(0.8);
    }

    .disabled {
      @apply opacity-25 cursor-default #{!important};
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mt-1 pt-1 pl-1 border-t-2 flex items-center text-sm gap-6 text-center' }
})
export class PaginationComponent {
  pagingInfo = input.required<PagingInfo>();
  tableSelection = input<readonly unknown[]>([]);
  tableActions = input<Action[]>([]);

  pagingChanged = output<PagingEvent>();
  clearSelection = output();
  tableAction = output<Action>();

  pageSize = computed(() => (this.pagingInfo().pageSize == 0 ? DEFAULT_SIZE : this.pagingInfo().pageSize));
  menuSizes = input<number[]>(DEFAULT_SIZES);
  summary = computed(() => {
    const pagingInfo = this.pagingInfo();

    if (pagingInfo.totalRows === 0) {
      return 'No rows displayed';
    }

    let summary: string;
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
  selectionSummary = computed(() => {
    const selection = this.tableSelection();
    const rowTerm = selection.length === 1 ? 'row' : 'rows';
    return selection.length > 0 ? `${selection.length} ${rowTerm} selected` : '';
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

  onMenuSize(size: number) {
    const pagingInfo = this.pagingInfo();
    const current =
      pagingInfo.current * size > pagingInfo.totalRows ? Math.ceil(pagingInfo.totalRows / size) : pagingInfo.current;

    this.pagingChanged.emit({
      pageNumber: current,
      pageSize: size
    });
  }
}
