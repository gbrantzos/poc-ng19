import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from '@poc/core/components/top-navbar/top-navbar.component';

@Component({
  selector: 'poc-default-layout',
  imports: [TopNavbarComponent, RouterOutlet],
  templateUrl: './default-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultLayoutComponent {}
