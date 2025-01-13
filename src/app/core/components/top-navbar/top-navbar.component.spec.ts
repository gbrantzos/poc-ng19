import { TestBed } from '@angular/core/testing';
import { TopNavbarComponent } from './top-navbar.component';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('TopNavbarComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [TopNavbarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(TopNavbarComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should create navigation links', async () => {
    const { fixture } = await setup();
    const links = fixture.debugElement.queryAll(By.directive(RouterLink)).map(d => d.injector.get(RouterLink));

    expect(links.length).toBe(3);
    expect(links[0].href).toBe('/');
    expect(links[1].href).toBe('/home');
    expect(links[2].href).toBe('/customers');
  });
});
