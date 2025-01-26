import { ChangeDetectionStrategy, Component, contentChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TemplateNameDirective } from './template-name.directive';

@Component({
  imports: [TemplateNameDirective],
  template: '<ng-template #test columnName="column"></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  template = contentChild(TemplateNameDirective);
}

describe('TemplateNameDirective', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: []
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create (host component)', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
