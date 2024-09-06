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
  datos: any;
  constructor(private router: Router, private navCtrl: NavController, private route: ActivatedRoute) {
    //Obtengo la navegacion actual
    const navegacion = this.router.getCurrentNavigation();
    //nav=navextras.user.username;
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
    const navegacion = this.router.getCurrentNavigation();
    this.datos=navegacion?.extras.state?.['user'];
    
  }

  /* Metodo para enviar los datos del usuario */
  //RestablecerContrasena(){
  //if (this.user.username == state.user) {

    
  }



