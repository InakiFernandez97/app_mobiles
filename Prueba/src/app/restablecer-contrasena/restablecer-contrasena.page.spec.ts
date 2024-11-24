import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerContrasenaPage } from './restablecer-contrasena.page';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('RestablecerContrasenaPage', () => {
  let component: RestablecerContrasenaPage;
  let fixture: ComponentFixture<RestablecerContrasenaPage>;
  let routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigateBack']);
  let navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
  let alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestablecerContrasenaPage],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user from navigation state', () => {
    const state = { user: { username: 'testuser', password: 'testpass' } };
    routerSpy.getCurrentNavigation.and.returnValue({ extras: { state } });
    component.ngOnInit();
    expect(component.user).toBe('testuser');
  });

  it('should show success alert when email is sent', async () => {
    component.user = 'testuser';
    component.datos = { username: 'testuser' };
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await component.envioCorreo();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'correo enviado',
      message: 'Se ha enviado un correo a la dirección: testuser@duoc.cl',
      buttons: ['OK']
    });
    expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith('/home');
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should show error alert when user does not match', async () => {
    component.user = 'wronguser';
    component.datos = { username: 'testuser' };
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await component.envioCorreo();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El usuario no coincide con el correo',
      buttons: ['OK']
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should navigate back to home on regresarLogin', () => {
    component.regresarLogin();
    expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith('/home');
  });
});