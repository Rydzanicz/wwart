import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './components/shop/shop.component';
import {ContactComponent} from './components/contact/contact.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsComponent} from './components/terms/terms.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {CartComponent} from './components/cart/cart.component';
import {SummaryComponent} from './components/summary/summary.component';
import {DeliveryComponent} from './components/delivery/delivery.component';
import {HomeComponent} from './components/home/home.component';
import {EbookComponent} from './components/ebook/ebook.component';
import {AboutComponent} from './components/about/about.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'ebook', component: EbookComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
