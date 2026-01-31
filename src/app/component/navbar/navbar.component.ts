import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterModule , FormsModule ,CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen = false;
   activeLink = '';
    searchTerm: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

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
