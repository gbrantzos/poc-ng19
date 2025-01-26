import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poc-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
