import { Component } from '@angular/core';
import { BuildInfo } from '@poc/build-info';
import { environment } from '@poc/environments/environment';

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
