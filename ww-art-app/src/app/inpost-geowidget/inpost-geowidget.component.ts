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
import {InpostGeowidgetAngularModule} from 'inpost-geowidget-angular';

@Component({
    selector: 'app-inpost-geowidget',
    standalone: true,
    imports: [CommonModule, InpostGeowidgetAngularModule],
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

    token = '';
    identifier = 'Geo1';
    language = 'pl';
    config = 'parcelcollect';
    sandbox = false;

    pointSelect(point: any) {
        console.log('Object of selected point: ', point);
        this.selectedPoint = point;
        this.pointSelected.emit(point);
        this.showMap = false;
    }

    apiReady(api: any) {
        api.changePosition({longitude: 20.318968, latitude: 49.731131}, 16);
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        if (!this.isBrowser) return;
    }

    openMap(): void {
        this.showMap = true;
    }

    closeMap(): void {
        this.showMap = false;
        window.location.reload();
    }

    changeLocker(): void {
        this.selectedPoint = null;
        this.openMap();
    }
}
