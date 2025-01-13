import { Component, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

interface NavbarItem {
  name: string;
  label: string;
  route: string;
  icon: string[];
}

@Component({
  selector: 'poc-top-navbar',
  imports: [MatToolbar, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  protected navbarItems = signal<NavbarItem[]>([
    {
      name: 'home',
      label: 'Home',
      route: '/home',
      icon: ['fa-solid', 'fa-house-chimney']
    },
    {
      name: 'customers',
      label: 'Customers',
      route: '/customers',
      icon: ['fa-solid', 'fa-person']
    }
  ]);
}
