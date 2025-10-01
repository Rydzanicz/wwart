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
import {InpostGeowidgetAngularModule} from "inpost-geowidget-angular";

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
    token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNzQ1NzU3NzMsImlhdCI6MTc1OTIxNTc3MywianRpIjoiMmY3MjEzMjgtMWZlYi00ZmY3LWE2ZjgtZWRmMmYzMzNjMDM0IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTp4dlVqS0h2VTJVcTJmZ01qclh2Q2xzVkVzMzhpN3Y5Ui14VzcxbDBaYk1BIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiMDQzZjI5ZjktNzNiYS00NDFhLWFhZTMtZjgyZWUzMjVlNGFmIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjA0M2YyOWY5LTczYmEtNDQxYS1hYWUzLWY4MmVlMzI1ZTRhZiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6IjYyZDljOWMyLWJjZTMtNDg5OS04OWI2LTc5NGE0ZThhNDA5MSJ9.HIt6Oi2fkFTnik_cx6zlTnOKfKgRi1STWWGTGWY1_M1ztHxksmMOH4pViY3j67qqxz9P9-wu0OjVz-1SuWDruS0BqNGRcsr_X-EjOis0Oqlsceb5szMV4UA1EJJHOvVG2nDdBJqKK-v1oz_D9y6LleAMaXxgcC6b8NC2RyorRoZ_eM7C2joCrPClYPy3BRrN0xCJ-sxO2e_f3gfH7pqY-HRYEUI0CHx3Zmb2R_1ddnmnqGG4U_Ydky5c8lgYyRobF3_2J76vFSbWM_p7fWVv2VM0mGMeM1sOo4IbySSURe2bspmNbgPk-VyDH0dlL9NFTqtKWbRJBLVEwXtIJvX8FA';     // Generate YOUR_TOKEN on https://manager.paczkomaty.pl (for production environment) or https://sandbox-manager.paczkomaty.pl (for sandbox environment).
    identifier = 'Geo1';
    language = 'pl';
    config = 'parcelcollect';
    sandbox = false;

    pointSelect(point: any) {
        console.log('Object of selected point: ', point);
    }

    apiReady(api: any) {
        api.changePosition({longitude: 20.318968, latitude: 49.731131}, 16);
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
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
    }

    changeLocker(): void {
        this.selectedPoint = null;
        this.openMap();
    }

}
