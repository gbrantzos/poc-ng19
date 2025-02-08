import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TitleComponent } from '@poc/shared/components/title/title.component';

@Component({
  selector: 'poc-customer-editor',
  imports: [TitleComponent, MatButton, MatIcon],
  templateUrl: './customer-editor.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class CustomerEditorComponent {
  editorClick = output<'save' | 'cancel' | 'delete'>();
}
