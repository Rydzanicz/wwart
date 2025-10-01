import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ebook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.scss']
})
export class EbookComponent {
  ebookPrice = 89.99;
  originalPrice = 149.99;
  quantity = 1;

  ebook = {
    id: 999,
    name: 'Kompletny przewodnik tworzenia ozdób z żywicy epoksydowej',
    description: 'Profesjonalny kurs tworzenia ozdób z żywicy krok po kroku',
    price: this.ebookPrice,
    originalPrice: this.originalPrice,
    image: ['assets/ebook/ebook.jpg'],
    category: 'Ebook edukacyjny',
    type: 'digital'
  };

  constructor(private router: Router) {}

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getTotalPrice(): number {
    return this.ebookPrice * this.quantity;
  }

  formatCurrency(price: number): string {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      currencyDisplay: 'symbol',
    })
      .format(price)
      .replace(' zł', '');
  }

  addToCart(): void {
    const cartItem = {
      id: this.ebook.id,
      name: this.ebook.name,
      description: this.ebook.description,
      price: this.ebook.price,
      originalPrice: this.ebook.originalPrice,
      quantity: this.quantity,
      image: this.ebook.image[0],
      category: this.ebook.category,
      type: 'ebook',
      totalPrice: this.getTotalPrice()
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = cart.findIndex((item: any) => item.id === this.ebook.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += this.quantity;
      cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * this.ebook.price;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    alert(`Dodano ${this.quantity}x ${this.ebook.name} do koszyka!`);
  }
}
