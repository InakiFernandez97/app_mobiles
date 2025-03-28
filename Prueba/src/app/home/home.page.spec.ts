import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let storage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: Storage,
          useValue: {
            set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storage = TestBed.inject(Storage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /dashboard on successful login', () => {
    component.user.username = 'testuser';
    component.user.password = 'testpass';
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard'], {
      state: { user: component.user },
    });
  });

  it('should show error message on empty username', () => {
    component.user.username = '';
    component.user.password = 'testpass';
    component.login();
    expect(component.mensaje).toEqual('usuario vacio o erroneo');
  });

  it('should show error message on empty password', () => {
    component.user.username = 'testuser';
    component.user.password = '';
    component.login();
    expect(component.mensaje).toEqual('contraseña vacia o erronea');
  });

  it('should navigate to /restablecer-contrasena', () => {
    spyOn(router, 'navigate');
    component.restablecerContrasena();
    expect(router.navigate).toHaveBeenCalledWith(['/restablecer-contrasena'], {
      state: { user: component.user },
    });
  });

  it('should save user data in storage', async () => {
    component.user.username = 'testuser';
    component.user.password = 'testpass';
    await component.guardarRegistro();
    expect(storage.set).toHaveBeenCalledWith(component.user.password, component.user.username);
  });
});
