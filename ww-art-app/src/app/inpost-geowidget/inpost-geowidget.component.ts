import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {InpostService} from '../services/InpostService';

@Component({
  selector: 'app-inpost-geowidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inpost-geowidget.component.html',
  styleUrls: ['./inpost-geowidget.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InpostGeowidgetComponent implements OnInit {
  @ViewChild('geowidget', {static: false}) geowidgetElement!: ElementRef;
  @Output() pointSelected = new EventEmitter<any>();

  isBrowser: boolean;
  selectedPoint: any = null;
  showMap: boolean = false;
  token: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private inpostService: InpostService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.token = this.inpostService.getToken();

    this.inpostService.getInpostPoints().subscribe({});

    const script = document.createElement('script');
    script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';
    script.defer = true;
    script.onload = () => this.initWidget();
    document.body.appendChild(script);

    document.addEventListener('onpointselect', (e: any) => {
      this.selectedPoint = e.detail;
      this.pointSelected.emit(e.detail);
      this.closeMap();
    });
  }

  openMap(): void {
    this.showMap = true;
  }

  closeMap(): void {
    this.showMap = false;
  }

  changeLocker(): void {
    this.selectedPoint = null;
    this.openMap();
  }

  initWidget() {
    const widgetEl = document.getElementById('inpost-widget');
    if (widgetEl && (window as any).easyPack) {
      (window as any).easyPack.init({
        token: this.token,
        elementId: 'inpost-widget',
        config: 'parcelcollect',
        language: 'pl',
        onPointSelect: (point: any) => {
          this.selectedPoint = point;
          this.pointSelected.emit(point);
          this.closeMap();
        }
      });
    }
  }
}
