import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mt-1 pt-1 pl-1 border-t-2 flex text-sm gap-6 text-center' }
})
export class PaginationComponent {}
