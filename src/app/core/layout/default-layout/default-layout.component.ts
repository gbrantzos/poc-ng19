import { Component } from '@angular/core';
import { TopNavbarComponent } from '@poc/core/components/top-navbar/top-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'poc-default-layout',
  imports: [TopNavbarComponent, RouterOutlet],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {}
