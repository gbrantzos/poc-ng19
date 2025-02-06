import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { SearchBoxComponent, SearchEvent } from '@poc/shared/components/search-box/search-box.component';

export type Action = {
  name: string;
  label?: string;
  tooltip?: string;
  icon?: string | string[];
  isPrimary?: boolean;
};

@Component({
  selector: 'poc-toolbar',
  imports: [SearchBoxComponent, NgClass, MatTooltip],
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-row-reverse items-center w-full pt-0.5 pb-1 gap-2' }
})
export class ToolbarComponent {
  toolbarActions = input<Action[]>();

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();
  toolbarAdvancedSearch = output<void>();
}
