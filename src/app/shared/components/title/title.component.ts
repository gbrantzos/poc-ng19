import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'poc-title',
  imports: [NgClass],
  templateUrl: './title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex pb-1' }
})
export class TitleComponent {
  title = input.required<string>();
  showClose = input<boolean>(false);
  icon = input<string[] | undefined>(['fa-regular', 'fa-file']);

  titleClose = output<void>();
}
