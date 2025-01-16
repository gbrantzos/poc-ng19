import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBoxComponent } from '@poc/shared/components/search-box/search-box.component';
import { NgClass } from '@angular/common';

interface Action {
  name: string;
  label: string;
  icon?: string | string[];
  isPrimary?: boolean;
}

@Component({
  selector: 'poc-toolbar',
  imports: [SearchBoxComponent, NgClass],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  protected toolbarActions: Action[] = [
    {
      name: 'new',
      label: 'New Customer',
      isPrimary: true,
      icon: ['ph', 'ph-plus']
    },
    {
      name: 'import',
      label: 'Import to ERP'
    },
    {
      name: 'download',
      label: 'Download'
    }
  ];
}
