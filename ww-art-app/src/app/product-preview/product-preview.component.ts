import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: any;
  @Input() availableShapes: { id: string, name: string, image: string }[] = [];
  @Output() selectedShapeChange = new EventEmitter<string>();

  selectedShape: string = '';
  selectedSize: string = 'M';
  selectedColor: string = 'Naturalny';
  quantity: number = 1;


  availableSizes: string[] = ['S', 'M', 'L'];
  availableColors: string[] = ['Naturalny', 'Złoty', 'Srebrny'];

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.availableShapes.length > 0) {
      this.selectedShape = this.availableShapes[0].id;
      this.selectedShapeChange.emit(this.selectedShape);
    }
  }

  setSelectedShape(shapeId: string): void {
    this.selectedShape = shapeId;
    this.selectedShapeChange.emit(shapeId);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getTotalPrice(): number {
    return this.product?.price * this.quantity || 0;
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
    if (!this.product) {
      console.error('Product not found. Unable to add to cart.');
      return;
    }

    const cartItem = {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      originalPrice: this.product.originalPrice,
      quantity: this.quantity,
      size: this.selectedSize,
      color: this.selectedColor,
      shape: this.selectedShape,
      image: this.product.image[0],
      category: this.product.category || 'Sztuka żywicowa',
      badge: this.product.badge,
      totalPrice: this.getTotalPrice()
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = cart.findIndex((item: any) =>
      item.id === this.product.id &&
      item.size === this.selectedSize &&
      item.color === this.selectedColor &&
      item.shape === this.selectedShape
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += this.quantity;
      cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * this.product.price;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    alert(`Dodano ${this.quantity}x ${this.product.name} do koszyka!`);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
