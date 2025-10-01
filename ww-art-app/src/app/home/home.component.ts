import {Component, Inject, OnInit, OnDestroy, PLATFORM_ID} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {Product} from '../models/product.interface';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ProductComponent, CommonModule, FormsModule],
  standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
  private isBrowser = false;

  images = [
    '../../assets/home/opinia1.jpg',
    '../../assets/home/opinia2.jpg',
    '../../assets/home/opinia3.jpg',
    '../../assets/home/opinia4.jpg'
  ];
  currentImageIndex = 0;
  private intervalId: number | undefined;

  products: Product[] = [
    {
      id: 1,
      name: 'Ciemno- szary zegar',
      description: 'Ekskluzywna zegar',
      descriptionDetails: 'Adresówka wykonana z najwyższej jakości materiałów, tworzona ręcznie z niezwykłą precyzją i artystycznym wyczuciem. Każdy egzemplarz powstaje w procesie rzemieślniczym, co sprawia, że jest unikalny i jedyny w swoim rodzaju.',
      price: 220,
      originalPrice: 380,
      image: ['../../assets/home/obraz.jpg'],
      badge: 'Bestseller',
    },
    {
      id: 2,
      name: 'Rodolit + tanzanit',
      description: 'Przepiękna adresówka z rodolitem w otoczeniu tanzanitami.',
      descriptionDetails: 'Adresówka wykonana z najwyższej jakości rodolitem, tworzona ręcznie z dbałością o każdy szczegół. Każda powstaje w procesie indywidualnego wykonania, co sprawia, że jest unikalna i pełna artystycznego wyrazu.',
      price: 230,
      image: ['../../assets/home/stolik.jpg'],
      badge: 'Bestseller',
      ratingCount: 18
    },
    {
      id: 3,
      name: 'Rubinowe serce',
      description: 'Romantyczna obroża z rubinami w kształcie serca.',
      descriptionDetails: 'Romantyczna adresówka z rubinami w kształcie serca. Każdy kamień został ręcznie dopasowany przez naszych mistrzów jubilerów.',
      price: 199,
      image: ['../../assets/home/deska.jpg'],
      badge: 'Bestseller',
      ratingCount: 9
    },
    {
      id: 4,
      name: 'Rubinowe serce',
      description: 'Romantyczna obroża z rubinami w kształcie serca.',
      descriptionDetails: 'Romantyczna adresówka z rubinami w kształcie serca. Każdy kamień został ręcznie dopasowany przez naszych mistrzów jubilerów.',
      price: 199,
      image: ['../../assets/home/zegar.jpg'],
      badge: 'Bestseller',
      ratingCount: 9
    }
  ];

  originalProductOrder: Product[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.originalProductOrder = [...this.products];

    if (this.isBrowser) {
      this.intervalId = window.setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 3000);
    }
  }

  goToEbook() {
    this.router.navigate(['/ebook']);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onProductClick() {
    if (this.isBrowser) {
      this.router.navigate(['/shop']);
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
