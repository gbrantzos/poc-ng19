import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poc-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  title = 'Home - POC Project';
}
