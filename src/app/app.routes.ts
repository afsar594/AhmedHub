import { Routes } from '@angular/router';
import { CoverBannerComponent } from './component/cover-banner/cover-banner.component';
import { SaleProductComponent } from './component/sale-product/sale-product.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { FAQComponent } from './component/faq/faq.component';
import { ShippingPolicyComponent } from './component/shipping-policy/shipping-policy.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';


export const routes: Routes = [
  { path: '', component: CoverBannerComponent },
  { path: 'shop', component: SaleProductComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'shippingpolicy', component: ShippingPolicyComponent },
  { path: 'Terms & Conditions', component: TermsConditionsComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  {path:'login' , component:LoginComponent},
  {path: 'signup', component: SignupComponent}
];
