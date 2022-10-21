import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [`
    .mapa-container{
      position: fixed;
      top: 0px;
      right: 0px;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class MapViewComponent implements  AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef<HTMLElement>;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {

    if (!this.placesService.userLocation) {
      throw new Error('No hay userlocation');
    }

    const mapa = new Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.userLocation,
      zoom: 14
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqu&iacute; estoy</h6>
        <span>Estoy en este lugar del nundo</span>  
      `);

    new Marker({ color: 'red' })
      .setLngLat( this.placesService.userLocation )
      .setPopup(popup)
      .addTo(mapa);

    this.mapService.setMap( mapa );
  }

}
