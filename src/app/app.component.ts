import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoverBannerComponent } from './component/cover-banner/cover-banner.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SaleProductComponent } from './component/sale-product/sale-product.component';
import { DetailCardComponent } from './component/detail-card/detail-card.component';
import { BuyNowComponent } from './component/buy-now/buy-now.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { FAQComponent } from './component/faq/faq.component';
import { ShippingPolicyComponent } from './component/shipping-policy/shipping-policy.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CoverBannerComponent,
    NavbarComponent,
    SaleProductComponent,
    DetailCardComponent,
    BuyNowComponent,
    AboutUsComponent,
    FAQComponent,
    ShippingPolicyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AhmedHub';
}
