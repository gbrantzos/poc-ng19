import { AfterContentInit, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[pocAutoFocus]'
})
export class AutofocusDirective implements AfterContentInit {
  private readonly DELAY = 100;
  public pocAutoFocus = input(false);

  public constructor(private el: ElementRef) {}

  public ngAfterContentInit() {
    if (this.pocAutoFocus()) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, this.DELAY);
    }
  }
}
