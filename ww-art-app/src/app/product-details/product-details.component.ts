import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ProductPreviewComponent} from '../product-preview/product-preview.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [
    CommonModule,
    ProductPreviewComponent,
    FormsModule,
    RouterLink
  ]
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  selectedSize = 'M';
  selectedColor = 'Srebrny';
  selectedTagShape = 'bone';
  quantity = 1;

  availableColors = ['Srebrny', 'Złoty', 'Różowe złoto'];
  availableSizes = ['S', 'M', 'L'];
  availableShapes: { id: string, name: string, image: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  onShapeSelected(shapeId: string): void {
    this.selectedTagShape = shapeId;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const productId = +this.route.snapshot.paramMap.get('id')!;
      this.setAvailableShapes();

      this.product = {
        id: productId,
        name: params['name'] || 'Luksusowa adresówka z diamentami',
        description: params['description'] || 'Ekskluzywna adresówka z prawdziwymi diamentami',
        descriptionDetails: params['descriptionDetails'] || 'Adresówka wykonana z najwyższej jakości materiałów, ręcznie zdobiona prawdziwymi diamentami. Każdy egzemplarz jest unikalny i powstaje w procesie rzemieślniczym.',
        price: params['price'] ? +params['price'] : 299.99,
        originalPrice: params['originalPrice'] ? +params['originalPrice'] : null,
        image: params['image'] ? JSON.parse(params['image']) : ['assets/diamond-tag.jpg'],
        category: params['category'] || null,
        badge: params['badge'] || null,
        rating: params['rating'] ? +params['rating'] : null,
        ratingCount: params['ratingCount'] ? +params['ratingCount'] : null,
        weight: '12g',
        dimensions: '35mm x 20mm'
      };
    });

    this.setAvailableShapes();
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

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) {
      console.error('Product not found. Unable to add to cart.');
      return;
    }

    const productPreview = document.querySelector('app-product-preview');
    let frontText = '';
    let backText = '';
    let tagShape = this.selectedTagShape || 'bone';

    if (productPreview) {
      const frontInput = productPreview.querySelector('input[placeholder*="Imię"]') as HTMLInputElement;
      const backInput = productPreview.querySelector('textarea') as HTMLTextAreaElement;
      const tagShapeInput = productPreview.querySelector('textarea') as HTMLTextAreaElement;

      if (frontInput) frontText = frontInput.value;
      if (backInput) backText = backInput.value;
      if (tagShapeInput) tagShape = this.selectedTagShape;
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
      image: this.product.image[0],
      category: this.product.category || 'Adresówki premium',
      badge: this.product.badge,
      weight: this.product.weight || '12g',
      dimensions: this.product.dimensions || '35mm x 20mm',
      frontText: frontText,
      backText: backText,
      tagShape: tagShape
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = cart.findIndex((item: any) =>
      item.id === this.product.id &&
      item.size === this.selectedSize &&
      item.color === this.selectedColor &&
      item.frontText === frontText &&
      item.backText === backText &&
      item.tagShape === tagShape
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += this.quantity;
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

  setAvailableShapes(): void {
    const name = this.product?.name?.toLowerCase() || '';
    if (name.includes('rubinowe serce')) {
      this.availableShapes = [
        {id: 'hearts', name: 'Serce', image: 'assets/serce.webp'}
      ];
      this.selectedTagShape = 'hearts';
    } else {
      this.availableShapes = [
        {id: 'bone', name: 'Kość', image: 'assets/kosci.webp'},
        {id: 'hearts', name: 'Serce', image: 'assets/serce.webp'},
        {id: 'circle', name: 'Okrąg', image: 'assets/okrogle.webp'}
      ];
      this.selectedTagShape = 'bone';
    }
  }

  calculateSavings(): number {
    if (this.product?.originalPrice) {
      return this.product.originalPrice - this.product.price;
    }
    return 0;
  }

  getRatingStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({filled: i <= rating});
    }
    return stars;
  }
}
