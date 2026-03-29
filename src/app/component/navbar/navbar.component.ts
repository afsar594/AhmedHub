import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { filter } from 'rxjs';

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
  currentUrl: string = '';
  constructor(
    private router: Router,
    private searchService: SearchService,
    private api: ApiService,
  ) {
    this.GetAllItemCard();
  }
   ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        console.log('Updated URL:', this.currentUrl);
      });
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
