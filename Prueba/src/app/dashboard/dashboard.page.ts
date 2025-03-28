import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CanComponentDeactivate } from '../candeactivate.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user = '';
  datos: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private authService: AuthService,
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

  ngOnInit() {
    const navegacion = this.router.getCurrentNavigation();
    this.datos = navegacion?.extras.state?.['user'];
  }


  irAsistencia()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
      },
    };
    this.router.navigate(['/inicio'], navigationExtras);
  }
  // Método de la interfaz CanComponentDeactivate
canDeactivate(): boolean {
  return confirm('¿Estás seguro que deseas cerrar sesión?');
  }
  //confirma con el usuario si desea salir
logout() {
  if (this.canDeactivate()) {
  this.authService.logout(); // Cerrar sesión
  this.router.navigate(['/inicio']);
  console.log("Sesion cerrada")
  }
  }
  

}
