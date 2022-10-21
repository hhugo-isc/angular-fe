import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  
  get isUserLoactionReady():boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  getUserLocation(){
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(({coords})=>{
        this.userLocation = [coords.longitude, coords.latitude];
        resolve(this.userLocation);
      }, (error)=>{
        alert('No se pudo obtener la geolocalizacion');
        reject(error);
      });
    });  
  }

  getPlacesByQuery( query: string ){
    
    this.isLoadingPlaces = true;
    
    if( query.length === 0){ 
        this.places = []; 
        this.isLoadingPlaces = false ;
        return; 
    }
    
    if (!this.userLocation) { throw new Error('No hay User Location'); }

    return this.placesApi.get<PlacesResponse>( `/${query}.json?`, { 
      params: { proximity: this.userLocation?.join(',')! }
    })
    .subscribe(resp=>{
      this.isLoadingPlaces = false;
      this.places = resp.features;

      this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
    });

  }

  deletePlaces(){
    this.places = [];
  }


}
