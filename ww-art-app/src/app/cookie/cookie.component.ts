import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf} from '@angular/common';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  private readonly cookieName = 'cookieConsentAccepted';
  public showBanner = false;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }
    this.showBanner = this.getCookie(this.cookieName) !== 'true';
  }

  acceptCookies() {
    this.setCookie(this.cookieName, 'true', 365);
    this.showBanner = false;
  }

  private setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  private getCookie(name: string): string {
    const cname = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
    }
    return '';
  }
}
