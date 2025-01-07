import { Component } from '@angular/core';
import { FooterComponent } from '@poc/core/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'poc-footer-only',
  imports: [FooterComponent, RouterOutlet],
  templateUrl: './footer-only.component.html',
  styleUrl: './footer-only.component.scss'
})
export class FooterOnlyComponent {}
