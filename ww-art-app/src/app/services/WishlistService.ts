import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private isBrowser = false;
  private wishlistSubject = new BehaviorSubject<number[]>([]);
  private wishlistIds: number[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadWishlistFromStorage();
  }

  private loadWishlistFromStorage() {
    if (!this.isBrowser) return;

    try {
      const stored = localStorage.getItem('ww-art-app-wishlist');
      if (stored) {
        this.wishlistIds = JSON.parse(stored);
        this.wishlistSubject.next([...this.wishlistIds]);
      }
    } catch (error) {
      console.warn('Error loading wishlist from storage:', error);
    }
  }

  addToWishlist(productId: number) {
    if (!this.wishlistIds.includes(productId)) {
      this.wishlistIds.unshift(productId);
      this.saveToStorage();
    }
  }

  removeFromWishlist(productId: number) {
    this.wishlistIds = this.wishlistIds.filter(id => id !== productId);
    this.saveToStorage();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistIds.includes(productId);
  }

  getWishlistIds(): number[] {
    return [...this.wishlistIds];
  }

  toggleWishlist(productId: number): boolean {
    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId);
      return false;
    } else {
      this.addToWishlist(productId);
      return true;
    }
  }

  private saveToStorage() {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem('ww-art-app-wishlist', JSON.stringify(this.wishlistIds));
      this.wishlistSubject.next([...this.wishlistIds]);
    } catch (error) {
      console.warn('Error saving wishlist to storage:', error);
    }
  }
}
