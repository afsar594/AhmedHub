import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './component/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AhmedHub';

  showNavbar = true;

  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       // admin login route
  //       this.showNavbar = !event.url.includes('/admin-login');
  //     }
  //   });
  // }
}
