import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SearchBoxComponent, SearchEvent } from '@poc/shared/components/search-box/search-box.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';

import { Action, ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(ToolbarComponent);
    const component = fixture.componentInstance;

    return { fixture, component, debugElement: fixture.debugElement };
  }

  it('should create', async () => {
    const { component } = await setup();

    expect(component).toBeTruthy();
  });

  it('should draw action buttons', async () => {
    const { debugElement, fixture } = await setup();
    const actions: Action[] = [
      {
        name: 'action1',
        label: 'Action 1'
      },
      {
        name: 'action2',
        label: 'Action 2'
      },
      {
        name: 'action3',
        label: 'Action 1',
        icon: ['ic1', 'ic2']
      }
    ];
    fixture.componentRef.setInput('toolbarActions', actions);
    fixture.detectChanges();

    const toolbarButtons = debugElement.queryAll(By.css('[data-test-id]'));
    expect(toolbarButtons).toBeTruthy();
    expect(toolbarButtons.length).toBe(3);

    const lastItem = toolbarButtons.find(d => d.attributes['data-test-id'] === 'toolbar-button-action3');
    expect(lastItem).toBeTruthy();
  });

  it('should emit click (toolbar action)', async () => {
    const { debugElement, fixture, component } = await setup();
    const actions: Action[] = [
      {
        name: 'action1',
        label: 'Action 1'
      },
      {
        name: 'action2',
        label: 'Action 2'
      },
      {
        name: 'action3',
        label: 'Action 1',
        icon: ['ic1', 'ic2']
      }
    ];
    fixture.componentRef.setInput('toolbarActions', actions);
    fixture.detectChanges();

    const toolbarButtons = debugElement.queryAll(By.css('[data-test-id]'));
    const button = toolbarButtons.find(d => d.attributes['data-test-id'] === 'toolbar-button-action3');

    spyOn(component.toolbarClick, 'emit');
    button?.nativeElement.click();
    fixture.detectChanges();

    expect(component.toolbarClick.emit).toHaveBeenCalledWith('action3');
  });

  it('should emit search', async () => {
    const { debugElement, component, fixture } = await setup();
    const searchBox = debugElement.query(By.directive(SearchBoxComponent)).componentInstance as SearchBoxComponent;
    const searchEvent: SearchEvent = { term: 'Search' };
    expect(searchBox).toBeTruthy();

    spyOn(component.toolbarSearch, 'emit');
    searchBox.search.emit(searchEvent);
    fixture.detectChanges();

    expect(component.toolbarSearch.emit).toHaveBeenCalledWith(searchEvent);
  });

  it('should emit advanced search', async () => {
    const { debugElement, component, fixture } = await setup();
    const searchBox = debugElement.query(By.directive(SearchBoxComponent)).componentInstance as SearchBoxComponent;
    expect(searchBox).toBeTruthy();

    spyOn(component.toolbarAdvancedSearch, 'emit');
    searchBox.advancedSearch.emit();
    fixture.detectChanges();

    expect(component.toolbarAdvancedSearch.emit).toHaveBeenCalled();
  });
});
