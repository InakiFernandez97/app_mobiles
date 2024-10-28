import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  user = '';
  datos: any;

  fechaChile:string | null = null;

  constructor(private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService) { 

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

    this.apiService.obtenerFechaChile().subscribe((data)=>{
      this.fechaChile = data.formatted;
    })
  }
  registrarAsistencia(){
    
  }

}
