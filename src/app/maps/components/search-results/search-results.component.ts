import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places.interface';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId: string = '';

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService
  ) { }

  get isLoadingPlaces(): boolean{
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesServices.places;
  }

  ngOnInit(): void {
  }

  flyTo( place: Feature ){
    
    this.selectedId = place.id;

    const [ lng, lat ] = place.center;
    this.mapService.flyTo([lng, lat])
  }

  getDirections( place: Feature ){
    
    if( !this.placesServices.userLocation ){ throw new Error('No hay user location'); }

    this.placesServices.deletePlaces();

    const start = this.placesServices.userLocation;
    const end = place.center as [number,  number];

    this.mapService.getROuteBetweenPoints(  start, end );
  }

}
