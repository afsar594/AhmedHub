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
import { DetailCardComponent } from './component/detail-card/detail-card.component';
import { BuyNowComponent } from './component/buy-now/buy-now.component';
import { CartPageComponent } from './component/cart-page/cart-page.component';
import { AdminLoginComponent } from './admin-component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-component/admin-dashboard/admin-dashboard.component';
import { AdminAddProductComponent } from './admin-component/admin-add-product/admin-add-product.component';


export const routes: Routes = [
  { path: '', component: CoverBannerComponent },
  {path:'home', component:CoverBannerComponent},
// {path:'cover-banner', component:CoverBannerComponent},
  { path: 'shop', component: SaleProductComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'shippingpolicy', component: ShippingPolicyComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  {path:'login' , component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path:'detail-page', component:DetailCardComponent},
  {path:'form-page', component:BuyNowComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'admin-panel', component:AdminLoginComponent},
  {path:'dashboard', component:AdminDashboardComponent},
  {path:'adminproductmanagement', component:AdminAddProductComponent}
];
