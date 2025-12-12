import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  // Sinal para controlar a abertura/fechamento do menu mobile
  mobileMenuOpen = signal(false);


  toggleMobileMenu() {
    this.mobileMenuOpen.update(current => !current);
  }

  

}
