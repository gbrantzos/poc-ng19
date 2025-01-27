import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'poc-title',
  imports: [],
  templateUrl: './title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex pb-1' }
})
export class TitleComponent {
  title = input.required<string>();
}
