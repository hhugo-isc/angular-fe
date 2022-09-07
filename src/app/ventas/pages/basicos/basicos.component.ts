import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent {

  nombreLower: string = 'hugo';
  nombreUpper: string = 'HUGO';
  nombreCompleto: string = 'hUgo HernAndEz';

  fecha: Date = new Date();
  

}
