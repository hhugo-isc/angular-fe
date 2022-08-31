import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import { PaisService } from '../../services/pasi.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit{
  
  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  termino: string = ''
  
  constructor(
    private paisService: PaisService
  ){}

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( valor => {
        this.onDebounce.emit(valor);
      });
  }
  
  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPrecionada( event: any ){
    this.debouncer.next( this.termino );
  }

}
