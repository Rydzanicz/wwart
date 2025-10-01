import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  RouterLink } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ProductPreviewComponent } from '../product-preview/product-preview.component';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const productId = +this.route.snapshot.paramMap.get('id')!;

      this.product = {
        id: productId,
        name: params['name'] || 'Unikalna ozdoba z żywicy epoksydowej',
        description: params['description'] || 'Ekskluzywna ozdoba wykonana z żywicy epoksydowej',
        descriptionDetails: params['descriptionDetails'] || 'Każda ozdoba jest wykonywana ręcznie z najwyższej jakości żywicy epoksydowej. Unikalny proces tworzenia sprawia, że każdy egzemplarz jest niepowtarzalny i pełen artystycznego wyrazu.',
        price: params['price'] ? +params['price'] : 299.99,
        originalPrice: params['originalPrice'] ? +params['originalPrice'] : null,
        image: params['image'] ? JSON.parse(params['image']) : ['assets/default-resin-art.jpg'],
        category: params['category'] || 'Sztuka żywicowa',
        badge: params['badge'] || null,
        rating: params['rating'] ? +params['rating'] : null,
        ratingCount: params['ratingCount'] ? +params['ratingCount'] : null,
        weight: '15g',
        dimensions: '40mm x 25mm'
      };
    });
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

  calculateSavings(): number {
    if (this.product?.originalPrice) {
      return this.product.originalPrice - this.product.price;
    }
    return 0;
  }

  getRatingStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ filled: i <= rating });
    }
    return stars;
  }
}
