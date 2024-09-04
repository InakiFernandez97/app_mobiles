import { Component } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /* Objeto JSON para usuario */

  user ={
    username: '',
    password: '',
  };
  /* mensaje de respuesta*/ 
  mensaje = '';

  /* estado de carga*/
  spinner = false;


  constructor() {}

}
