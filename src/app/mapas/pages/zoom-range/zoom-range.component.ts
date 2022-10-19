import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl  from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
     .mapa-cointainer{
        height: 100%;
        width: 100%;
      }

      .row{
        background-color: white;
        bottom: 50px;
        border-radius: 5px;
        left: 50px;
        padding: 10px;
        position:fixed;
        z-index: 9999;
        width: 400px;
      }
  `]
})
export class ZoomRangeComponent implements AfterViewInit,  OnDestroy{

  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  zoomLevel: number = 10;
  centro: [number, number] = [ -99.26390874613476, 19.592476747227884];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centro,
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', ( e )=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', ()=>{
      if( this.mapa.getZoom() > 18 )
       this.mapa.zoomTo(18)
    });

    this.mapa.on('move', ( event )=>{
      const {lng, lat} = event.target.getCenter();
      this.centro = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }

  zoomOut(){
    this.mapa.zoomOut()
    this.zoomLevel = this.mapa.getZoom();
  } 

  zoomIn(){
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio( zoom: string ){
    this.mapa.zoomTo(Number( zoom ));
  }

}
