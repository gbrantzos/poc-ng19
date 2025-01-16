import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'poc-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pb-1' }
})
export class TitleComponent {
  title = input.required<string>();
}
