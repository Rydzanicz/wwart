import {Component, Inject, OnInit, OnDestroy, PLATFORM_ID} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {Product} from '../../models/product.interface';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {WishlistService} from '../../services/WishlistService';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports: [ProductComponent, CommonModule, FormsModule],
  standalone: true
})
export class ShopComponent implements OnInit {
  private isBrowser = false;

  products: Product[] = [
    {
      id: 1,
      name: 'Zegar z falami morskimi1',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 220,
      originalPrice: 380,
      image: ['assets/shop/zegar.jpg'],
      isInWishlist: false
    },
    {
      id: 2,
      name: 'Zegar z falami morskimi2',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar2.jpg'],
      isInWishlist: false
    },
    {
      id: 3,
      name: 'Zegar z falami morskimi3',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar3.jpg'],
      isInWishlist: false
    }, {
      id: 4,
      name: 'Zegar z falami morskimi4',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar4.jpg'],
      isInWishlist: false
    }, {
      id: 5,
      name: 'Zegar z falami morskimi5',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar5.jpg'],
      isInWishlist: false
    }, {
      id: 6,
      name: 'Zegar z falami morskimi6',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar6.jpg'],
      isInWishlist: false
    }, {
      id: 7,
      name: 'Zegar z falami morskimi7',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar7.jpg'],
      isInWishlist: false
    }, {
      id: 8,
      name: 'Zegar z falami morskimi8',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar8.jpg'],
      isInWishlist: false
    }, {
      id: 9,
      name: 'Zegar z falami morskimi9',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar9.jpg'],
      isInWishlist: false
    }, {
      id: 10,
      name: 'Zegar z falami morskimi10',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/zegar10.jpg'],
      isInWishlist: false
    }, {
      id: 11,
      name: 'stolik1',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/stolik1.jpg'],
      isInWishlist: false
    }, {
      id: 12,
      name: 'stolik2',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/stolik2.jpg'],
      isInWishlist: false
    }, {
      id: 13,
      name: 'stolik3',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/stolik3.jpg'],
      isInWishlist: false
    }, {
      id: 14,
      name: 'stolik4',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/stolik4.jpg'],
      isInWishlist: false
    }, {
      id: 15,
      name: 'deska1',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/deska1.jpg'],
      isInWishlist: false
    }, {
      id: 16,
      name: 'deska2',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/deska2.jpg'],
      isInWishlist: false
    }, {
      id: 17,
      name: 'obraz1',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/obraz1.jpg'],
      isInWishlist: false
    }, {
      id: 18,
      name: 'obraz2',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/obraz2.jpg'],
      isInWishlist: false
    }, {
      id: 19,
      name: 'obraz3',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/obraz3.jpg'],
      isInWishlist: false
    }, {
      id: 20,
      name: 'obraz4',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/obraz4.jpg'],
      isInWishlist: false
    }, {
      id: 21,
      name: 'obraz5',
      description: 'Ekskluzywna zegar z falami morskimi',
      descriptionDetails: 'zegar z falami morskimi.',
      price: 230,
      image: ['assets/shop/obraz5.jpg'],
      isInWishlist: false
    }
  ];

  filteredProducts: Product[] = [];
  originalProductOrder: Product[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private wishlistService: WishlistService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.originalProductOrder = [...this.products];

    this.updateProductWishlistStatus();

    this.sortProducts();
  }

  onProductClick(product: Product) {
    if (this.isBrowser) {
      this.router.navigate(['/product', product.id], {
        queryParams: {
          name: product.name,
          description: product.description,
          descriptionDetails: product.descriptionDetails,
          price: product.price,
          originalPrice: product.originalPrice,
          image: JSON.stringify(product.image),
          category: product.category,
          badge: product.badge,
          rating: product.rating,
          ratingCount: product.ratingCount
        }
      });
    }
  }

  onWishlistChanged() {
    this.updateProductWishlistStatus();
    this.sortProducts();
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  private updateProductWishlistStatus() {
    this.products.forEach(product => {
      product.isInWishlist = this.wishlistService.isInWishlist(product.id);
    });
  }

  private sortProducts() {
    const wishlistIds = this.wishlistService.getWishlistIds();

    this.filteredProducts = [...this.products].sort((a, b) => {
      const aInWishlist = wishlistIds.includes(a.id);
      const bInWishlist = wishlistIds.includes(b.id);

      if (aInWishlist && !bInWishlist) return -1;
      if (!aInWishlist && bInWishlist) return 1;

      if (aInWishlist && bInWishlist) {
        return wishlistIds.indexOf(a.id) - wishlistIds.indexOf(b.id);
      }

      return this.originalProductOrder.indexOf(a) - this.originalProductOrder.indexOf(b);
    });
  }
}
