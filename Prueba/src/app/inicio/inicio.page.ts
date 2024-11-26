import { LensFacing} from './../../../node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/definitions.d';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ModalController, NavController} from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { QrCodeModule } from 'ng-qrcode';
import { addIcons } from 'ionicons';
import { IonModal } from '@ionic/angular/common';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  segment = 'scan';
  qrText = 'qrcito';
  user = '';
  datos: any;
  posts: any[] = [];
  capturedImage: string | null = null;
  scanResult = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private ModalController: ModalController) { 

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

  async startScan() {
    const modal = await this.ModalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
         formats: [], 
         LensFacing: LensFacing.Back }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }
  }

    

  ngOnInit() {
    const navegacion = this.router.getCurrentNavigation();
    this.datos = navegacion?.extras.state?.['user'];

    this.apiService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(('api'))
      console.log(this.posts);
      });

   
  }
}
