import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [SearchBoxComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(SearchBoxComponent);
    const component = fixture.componentInstance;

    return { fixture, component, debugElement: fixture.debugElement };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should emit changed (search input)', async () => {
    const { component, fixture, debugElement } = await setup();
    const searchInput = debugElement.query(By.css('input[type="text"]'));

    spyOn(component.changed, 'emit');
    fixture.detectChanges();

    searchInput.nativeElement.value = 'search input';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.changed.emit).toHaveBeenCalledWith({ term: 'search input' });
  });

  it('should emit search (search enter)', async () => {
    const { component, fixture, debugElement } = await setup();
    const searchInput = debugElement.query(By.css('input[type="text"]'));

    spyOn(component.search, 'emit');
    fixture.detectChanges();

    searchInput.nativeElement.value = 'search enter';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    searchInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.search.emit).toHaveBeenCalledWith({ term: 'search enter' });
  });

  it('should emit advanced search', async () => {
    const { component, fixture, debugElement } = await setup();
    const filterButton = debugElement.query(By.css('#advancedSearch'));

    spyOn(component.advancedSearch, 'emit');
    fixture.detectChanges();

    filterButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.advancedSearch.emit).toHaveBeenCalled();
  });

  it('should emit search (clear)', async () => {
    const { component, fixture, debugElement } = await setup();
    const searchInput = debugElement.query(By.css('input[type="text"]'));
    const clearButton = debugElement.query(By.css('#clearButton'));

    spyOn(component.search, 'emit');
    fixture.detectChanges();

    searchInput.nativeElement.value = 'dummy';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    clearButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.search.emit).toHaveBeenCalledWith('CLEARED');
    expect(searchInput.nativeElement.value).toBe('');
  });
});
