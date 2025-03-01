import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_MENU_ITEMS } from '@poc/app.menu-items.definition';

export type NavbarItem = {
  name: string;
  label: string;
  route: string;
  icon: string[];
};

@Component({
  selector: 'poc-top-navbar',
  imports: [MatToolbar, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './top-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavbarComponent {
  protected navbarItems = signal<NavbarItem[]>(APP_MENU_ITEMS);
}
