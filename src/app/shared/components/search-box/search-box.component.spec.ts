import { TestBed } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

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

  it('should emit search (button click)', async () => {
    const { component, fixture, debugElement } = await setup();
    const searchInput = debugElement.query(By.css('input[type="text"]'));
    const searchButton = debugElement.query(By.css('#searchButton'));

    spyOn(component.search, 'emit');
    fixture.detectChanges();

    searchInput.nativeElement.value = 'search click';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    searchButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith('search click');
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

    expect(component.changed.emit).toHaveBeenCalledWith('search input');
  });

  it('should emit filter', async () => {
    const { component, fixture, debugElement } = await setup();
    const filterButton = debugElement.query(By.css('#filterButton'));

    spyOn(component.filter, 'emit');
    fixture.detectChanges();

    filterButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.filter.emit).toHaveBeenCalled();
  });

  it('should emit clear', async () => {
    const { component, fixture, debugElement } = await setup();
    const searchInput = debugElement.query(By.css('input[type="text"]'));
    const clearButton = debugElement.query(By.css('#clearButton'));

    spyOn(component.clear, 'emit');
    fixture.detectChanges();

    searchInput.nativeElement.value = 'dummy';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    clearButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.clear.emit).toHaveBeenCalled();
    expect(searchInput.nativeElement.value).toBe('');
  });
});
