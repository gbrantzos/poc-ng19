import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SearchBoxComponent } from '@poc/shared/components/search-box/search-box.component';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

export interface Action {
  name: string;
  label?: string;
  tooltip?: string;
  icon?: string | string[];
  isPrimary?: boolean;
}

@Component({
  selector: 'poc-toolbar',
  imports: [SearchBoxComponent, NgClass, MatTooltip],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  toolbarActions = input<Action[]>();
  toolbarClicked = output<string>();
}
