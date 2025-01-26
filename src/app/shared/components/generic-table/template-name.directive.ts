/* eslint-disable @angular-eslint/directive-selector */
import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[columnName]'
})
export class TemplateNameDirective {
  name = input.required({ alias: 'columnName' });

  constructor(public template: TemplateRef<unknown>) {}
}
