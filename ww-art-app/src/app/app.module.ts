import {NgModule} from '@angular/core';
import {provideRouter} from '@angular/router';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app.routes';
import {ShopComponent} from './shop/shop.component';
import {HttpClientModule} from '@angular/common/http';
import { InpostGeowidgetAngularModule } from 'inpost-geowidget-angular';

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
