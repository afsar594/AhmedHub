import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen = false;
  activeLink = '';
  searchTerm: string = '';
  cartCount: any; // example value

  constructor(
    private router: Router,
    private searchService: SearchService,
    private api: ApiService,
  ) {
    this.GetAllItemCard();
  }
  GetAllItemCard() {
    this.api.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
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

  onSearchChange() {
    this.searchService.setSearchText(this.searchTerm);
  }
}
