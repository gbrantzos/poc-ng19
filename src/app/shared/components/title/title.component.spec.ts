import { TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('TitleComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(TitleComponent);
    const component = fixture.componentInstance;

    return { fixture, component, debugElement: fixture.debugElement };
  }

  it('should create', async () => {
    const { component, fixture } = await setup();
    fixture.componentRef.setInput('title', 'This is a title');
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display title', async () => {
    const { fixture, debugElement } = await setup();
    const title = debugElement.query(By.css('#title'));

    fixture.componentRef.setInput('title', 'This is a title');
    fixture.detectChanges();

    expect(title).toBeTruthy();
    expect(title.nativeElement.innerHTML).toEqual('This is a title');
  });
});
