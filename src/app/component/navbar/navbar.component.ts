import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchControl = new FormControl('');
  filteredProducts: any[] = [];
  allProducts: any[] = []; // dynamic products

  menuOpen = false;
  activeLink = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Example products (replace with API)
    this.allProducts = [
      { title: 'Boys Casual T-Shirt' },
      { title: 'Boys Denim Jeans' },
      { title: 'Boys Hoodie Sweatshirt' },
      { title: 'Boys Sports Sneakers' },
      { title: 'Boys Running Shorts' },
      { title: 'Boys Backpack' },
      { title: 'Boys Wrist Watch' },
      { title: 'Boys Sneakers Black' },
      { title: 'Boys Shoes Blue' },
    ];

    // Live search suggestions
    this.searchControl.valueChanges
      .pipe(debounceTime(150))
      .subscribe((term: string | null) => {
        if (!term?.trim()) {
          this.filteredProducts = [];
        } else {
          const lowerTerm = term.toLowerCase();
          this.filteredProducts = this.allProducts.filter(p =>
            p.title.toLowerCase().includes(lowerTerm)
          );
        }
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  navigateToCart() {
    this.router.navigate(['cart-page']);
  }

  // Click on suggestion
  selectProduct(product: any) {
    this.searchControl.setValue(product.title);
    this.filteredProducts = [];
    this.submitSearch(); // navigate to shop page
  }

  // Enter key or search icon clicked
  submitSearch() {
    const term = this.searchControl.value?.trim();
    if (!term) return;

    // Clear suggestions
    this.filteredProducts = [];

    // Navigate to shop page with query
    this.router.navigate(['/shop'], { queryParams: { search: term } });
  }
}
