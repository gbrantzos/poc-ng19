import { TestBed } from '@angular/core/testing';

import { DynamicEditorComponent } from './dynamic-editor.component';
import { provideRouter } from '@angular/router';
import { FormGroup } from '@angular/forms';

describe('DynamicEditorComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [DynamicEditorComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DynamicEditorComponent);
    const component = fixture.componentInstance;

    return { fixture, component, debugElement: fixture.debugElement };
  }

  it('should create', async () => {
    const { component, fixture } = await setup();
    fixture.componentRef.setInput('editorDefinition', {
      title: {
        new: 'New Entity'
      }
    });
    fixture.componentRef.setInput('editorData', {
      isNew: true,
      form: new FormGroup({})
    });
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
