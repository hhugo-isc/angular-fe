import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicosComponent } from './ventas/pages/basicos/basicos.component';
import { NoComunesComponent } from './ventas/pages/no-comunes/no-comunes.component';
import { OrdenarComponent } from './ventas/pages/ordenar/ordenar.component';
import { NumerosComponent } from './ventas/pages/numeros/numeros.component';


const rutas: Routes = [
  {
    path: '',
    component: BasicosComponent,
    pathMatch: 'full'
  },{
    path: 'numeros',
    component: NumerosComponent,
  },{
    path: 'no-comunes',
    component: NoComunesComponent,
  },{
    path: 'ordenar',
    component: OrdenarComponent
  },{
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
