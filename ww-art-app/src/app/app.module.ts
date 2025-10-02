import {NgModule} from '@angular/core';
import {provideRouter} from '@angular/router';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ContactComponent} from './components/contact/contact.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsComponent} from './components/terms/terms.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app.routes';
import {ShopComponent} from './components/shop/shop.component';
import {HttpClientModule} from '@angular/common/http';
import { InpostGeowidgetAngularModule } from 'inpost-geowidget-angular';
import {AboutComponent} from './components/about/about.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrivacyComponent,
    AboutComponent,
    ContactComponent,
    AppComponent,
    FooterComponent,
    InpostGeowidgetAngularModule,
    TermsComponent,
    HttpClientModule,
    ShopComponent
  ],
  providers: [],
})
export class AppModule {
  static bootstrap() {
    return bootstrapApplication(AppComponent, {
      providers: [provideRouter([])]
    });
  }
}
