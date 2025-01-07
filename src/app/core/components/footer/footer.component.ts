import { Component } from '@angular/core';
import { environment } from '@poc/environments/environment';
import { BuildInfo } from '@poc/build-info';

@Component({
  selector: 'poc-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected buildInfo = BuildInfo;
  protected environment = environment.name;
}
