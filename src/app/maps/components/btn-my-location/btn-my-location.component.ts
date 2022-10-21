import { Component, OnInit } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent implements OnInit {

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) { }

  ngOnInit(): void {
  }

  goToMyLocation(){
    
    if( !this.placesService.isUserLoactionReady ){ throw new Error("No hay ubicacion de usuario")}
    if( !this.mapService.isMapReady ){ throw new Error("El mapa no esta inicializado") }

    this.mapService.flyTo( this.placesService.userLocation! );
  }

}
