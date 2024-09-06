import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {
  user = "";
  constructor(private router: Router) {
    //Obtengo la navegacion actual
    const navegacion = this.router.getCurrentNavigation();
    //Obtengo el estado de la navegacion
    const state = navegacion?.extras.state as {
      user : {
        username: string;
        password: string; 
      };
    };
    if(state){
      this.user = state.user.username;
    }
  }


  /* Metodo para enviar los datos del usuario */
  
  ngOnInit() {
  }


  
}
