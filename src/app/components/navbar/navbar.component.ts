import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import navlist from '../../lib/navlist';
@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navlist = navlist;
}
