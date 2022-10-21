import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = environment.mapboxToken;

if(!navigator.geolocation){
  alert('El navegador no soporta la geolocalizacion');
  throw new Error('El navegador no soporta la geolocalizacion');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
