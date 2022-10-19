import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl  from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]; 
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-cointainer{
      height: 100%;
      width: 100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
    }

    li{
      cursor:pointer;
    }

  `]
})
export class MarcadoresComponent implements AfterViewInit, OnDestroy {

  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  zoomLevel: number = 10;
  centro: [number, number] = [ -99.26390874613476, 19.592476747227884];

  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centro,
      zoom: this.zoomLevel,
    });
    this.leerMarcadores();
  }

  ngOnDestroy(): void {

  }

  irMarcador( marker: mapboxgl.Marker ){
    this.mapa.flyTo({center: marker.getLngLat()});
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({ color })
      .setDraggable(true)
      .setLngLat(this.centro)
      .addTo(this.mapa);
    this.marcadores.push({ color, marker: nuevoMarcador });
    this.guardarMarcadores();

    nuevoMarcador.on('dragend',()=>{
      this.guardarMarcadores();
    });
  }

  guardarMarcadores(){
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( marcador => {
      const color = marcador.color;
      const {lng, lat } = marcador.marker!.getLngLat();
      lngLatArr.push({ color, centro:[lng, lat] });
    });

    localStorage.setItem('marcadores', JSON.stringify( lngLatArr ));
  }

  leerMarcadores(){
    if (!localStorage.getItem('marcadores')) { return; }

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( marcador => {
      
      const nuevoMarcador = new mapboxgl.Marker({
        color: marcador.color,
        draggable: true
      })
      .setLngLat( marcador.centro! )
      .addTo(this.mapa);

      this.marcadores.push({
        marker: nuevoMarcador,
        color: marcador.color
      });

      nuevoMarcador.on('dragend',()=>{
        this.guardarMarcadores();
      });
      
    });
  }

  borrarMarcador( indice: number ){
    this.marcadores[indice].marker?.remove();
    this.marcadores.splice(indice, 1);
    this.guardarMarcadores();
  }


}
