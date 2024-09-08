import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {
  user = '';
  datos: any;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    //Obtengo la navegacion actual
    const navegacion = this.router.getCurrentNavigation();
    //nav=navextras.user.username;
    //Obtengo el estado de la navegacion
    const state = navegacion?.extras.state as {
      user: {
        username: string;
        password: string;
      };
    };
    if (state) {
      this.user = state.user.username;
    }
  }

  /* Metodo para enviar los datos del usuario */

  ngOnInit() {
    const navegacion = this.router.getCurrentNavigation();
    this.datos = navegacion?.extras.state?.['user'];
  }
  /*metodo de restauracion de contraseña */
  async envioCorreo() {
    if (this.user == this.datos.username) {
      const alert = await this.alertController.create({
        header: 'correo enviado',
        message: 'Se ha enviado un correo a la dirección: ' + this.user + '@duoc.cl',
        buttons: ['OK'],
      
      });
      this.navCtrl.navigateBack('/home');
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El usuario no coincide con el correo',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
