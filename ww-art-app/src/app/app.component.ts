import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CookieComponent} from './cookie/cookie.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AiAssistantComponent} from './ai-assistant/ai-assistant.component';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  timeout?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, CookieComponent, AiAssistantComponent],
  standalone: true
})
export class AppComponent implements OnInit {

  title = 'WWart';
  toasts: Toast[] = [];
  private toastIdCounter = 0;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('showToast', (event: any) => {
        this.showToast(event.detail.message, event.detail.type, event.detail.title);
      });

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }, 0);
        }
      });
    }
  }

  showToast(message: string, type: Toast['type'], title?: string) {
    const toast: Toast = {
      id: ++this.toastIdCounter,
      type,
      title,
      message,
      timeout: 5000
    };

    this.toasts.push(toast);

    setTimeout(() => {
      this.dismissToast(toast);
    }, toast.timeout);
  }

  dismissToast(toast: Toast) {
    const index = this.toasts.findIndex(t => t.id === toast.id);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }
}
