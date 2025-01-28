import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'poc-title',
  imports: [NgClass],
  templateUrl: './title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex pb-1' }
})
export class TitleComponent {
  title = input.required<string>();
  icon = input<string[]>(['ph', 'ph-file-text']);
}
