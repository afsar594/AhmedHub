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
import { CartPageComponent } from './component/cart-page/cart-page.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';


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
    CartPageComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    RouterOutlet,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AhmedHub';
}
