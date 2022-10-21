import { Injectable } from '@angular/core';
import { Map, Marker, Popup, LngLatLike,  LngLatBounds, AnySourceData} from "mapbox-gl";
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';
import { Feature } from '../interfaces/places.interface';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    private map: Map | undefined;
    private markers: Marker[] = []

    
    constructor(
        private directionApi: DirectionsApiClient
    ){}
        
    get isMapReady(): boolean{
        return !!this.map;
    }

    setMap( mapa: Map){
        this.map = mapa;
    }

    flyTo( cords: LngLatLike ){
        if( !this.isMapReady ){ throw new Error("El mapa no esta inicializado"); }
        this.map?.flyTo({
            zoom: 14,
            center: cords
        });
    }

    createMarkersFromPlaces( places: Feature[], userLocation: [number, number] ){

        if (!this.map) { throw new Error('Mapa no inicializado'); }

        this.markers.forEach( marker => marker.remove() );
        const newMarkers = [];

        for (const place of places) {
            
            const [ lng, lat ] = place.center;
            
            const popup: Popup = new Popup()
                .setHTML(`
                    <h6>${ place.text }</h6>
                    <span>${ place.place_name }</span>
                `);

            const newMarker: Marker = new Marker()
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo( this.map );
            
                newMarkers.push( newMarker );
        }

        this.markers = newMarkers;

        if (places.length === 0) { return; }

        const bounds = new LngLatBounds();

        this.markers.forEach( marker => bounds.extend(marker.getLngLat()) );
        bounds.extend(userLocation);

        this.map.fitBounds(bounds, { padding: 200 });
    }

    getROuteBetweenPoints( start: [number, number], end: [number, number] ){
        this.directionApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
            .subscribe( resp => this.drawPolyline(resp.routes[0]) );
    }

    private drawPolyline( route: Route ){

        if(!this.map){ throw new Error('Mapa no inicializado'); }

        const cords = route.geometry.coordinates;
        const start = cords[0] as [number, number];

        const bounds = new LngLatBounds();

        cords.forEach( (coord) => bounds.extend( coord as [number, number] ));

        this.map?.fitBounds( bounds );

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: cords
                        }
                    }
                ]
            }
        };

        if( this.map.getLayer('RouteString') ){
            this.map.removeLayer('RouteString');
            this.map.removeSource('RouteString');
        }

        this.map.addSource('RouteString', sourceData);
        this.map.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap':'round',
                'line-join': 'round',
            }, 
            paint: {
                'line-color':'black',
                'line-width': 3
            }
        });

    }

}
