import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html'
})
export class MapScreenComponent implements OnInit {



  constructor(
    private placesService: PlacesService
  ) { }

  get isUserLocationReady(){
    return this.placesService.isUserLoactionReady;
  }

  ngOnInit(): void {
    
  }

}
