import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  imports: [AutofocusDirective],
  template: `
    <input id="i1" type="text" />
    <input id="i2" [pocAutoFocus]="true" type="text" />
    <input id="i3" [pocAutoFocus]="false" type="text" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class WrapperComponent {}

describe('AutofocusDirective', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [WrapperComponent],
      providers: []
    }).compileComponents();

    const fixture = TestBed.createComponent(WrapperComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    return { fixture, component, debugElement: fixture.debugElement };
  }

  it('should focus element with directive (host component)', fakeAsync(async () => {
    const { debugElement } = await setup();

    tick(200);

    const inputElement = debugElement.query(By.directive(AutofocusDirective));
    const focusedElement = debugElement.query(By.css(':focus'));

    expect(inputElement.nativeElement).toBe(focusedElement.nativeElement);
  }));
});
