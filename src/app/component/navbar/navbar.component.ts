import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen = false;
  activeLink = '';

  searchText: string = '';

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  navigateToCart(): void {
    this.router.navigate(['cart-page']);
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  onSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/sale-product'], {
        queryParams: { search: this.searchText }
      });
    }
  }
}

