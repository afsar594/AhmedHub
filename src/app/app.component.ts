import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoverBannerComponent } from './component/cover-banner/cover-banner.component';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CoverBannerComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AhmedHub';
}
