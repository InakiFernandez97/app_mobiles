import { RestablecerContrasenaPage } from './../restablecer-contrasena/restablecer-contrasena.page';
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /* Objeto JSON para usuario */

  user = {
    username: '',
    password: '',
  };
  /* mensaje de respuesta*/
  mensaje = '';

  /* estado de carga*/
  spinner = false;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private navCtrl: NavController,
    private authService: AuthService,

  ) {}
  
  ngAfterContentInit() {
    this.animarLogin();
  }

  animarLogin() {
    //seleccionar item del front y reconcerlo como HTMLElement para que sea compatible con el metodo animate
    const loginIcon = document.querySelector('.login img') as HTMLElement;

    //crear  y comfigurar la animacion
    const animation = this.animationController
      .create()
      .addElement(loginIcon)
      .duration(10000)
      .iterations(Infinity)
      /* la configuracion de keyframe permite editar el diseño segun el tiempo de la animacion empezando desde 0 hasta 1 usando los decimales(0.5,0.25 ,0.2) */
      .keyframes([
        { offset: 0, opacity: '1', width: '200px', height: '200px' },
        { offset: 0.5, opacity: '0.5', width: '150px', height: '150px' },
        { offset: 1, opacity: '1', width: '200px', height: '200px' },
      ]);
    animation.play();
  }

  /* NGIF = permite realizar una validacion entre html y ts validando que la variable sea true o false */
  /* Permite cambiar el valor por defecto del spinner y comprobarlo con ngIF */
  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  /* Metodo para enviar los datos del usuario */
  login() {
    if (this.authService.login(this.user.username, this.user.password)) {
      if (this.user.password) {
        //funciona
        this.mensaje = 'Cargando';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.cambiarSpinner();
        /* settimeout para delay */
        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: {
              user: this.user,
            },
          };
          this.router.navigate(['/inicio'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = '';
        }, 1000);
      } else {
        console.log('contraseña vacia o erronea');
        this.mensaje = 'contraseña vacia o erronea';
      }
    } else {
      console.log('usuario vacio o erroneo');
      this.mensaje = 'usuario vacio o erroneo';
    }
  }

  restablecerContrasena() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
      },
    };
    this.router.navigate(['/restablecer-contrasena'], navigationExtras);
  }

 
}
