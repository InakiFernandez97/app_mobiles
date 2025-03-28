import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('InicioPage', () => {
    let component: InicioPage;
    let fixture: ComponentFixture<InicioPage>;
    let routerSpy: jasmine.SpyObj<Router>;
    let navCtrlSpy: jasmine.SpyObj<NavController>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;
    let modalControllerSpy: jasmine.SpyObj<ModalController>;
    let platformSpy: jasmine.SpyObj<Platform>;

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
      navCtrlSpy = jasmine.createSpyObj('NavController', ['']);
      apiServiceSpy = jasmine.createSpyObj('ApiService', ['getPosts']);
      modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
      platformSpy = jasmine.createSpyObj('Platform', ['']);

      TestBed.configureTestingModule({
        declarations: [InicioPage],
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: NavController, useValue: navCtrlSpy },
          { provide: ApiService, useValue: apiServiceSpy },
          { provide: ModalController, useValue: modalControllerSpy },
          { provide: Platform, useValue: platformSpy }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(InicioPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize user from navigation state', () => {
      const mockNavigation = {
        extras: {
          state: {
            user: {
              username: 'testuser',
              password: 'testpass'
            }
          }
        }
      };
      routerSpy.getCurrentNavigation.and.returnValue(mockNavigation as any);
      component.ngOnInit();
      expect(component.user).toBe('testuser');
    });

    it('should fetch posts on init', () => {
      const mockPosts = [{ id: 1, title: 'Post 1' }];
      apiServiceSpy.getPosts.and.returnValue(of(mockPosts));
      component.ngOnInit();
      expect(component.posts).toEqual(mockPosts);
    });

    it('should start scan and get result', async () => {
      const mockModal = {
        present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
        onWillDismiss: jasmine.createSpy('onWillDismiss').and.returnValue(Promise.resolve({ data: { barcode: { displayValue: '12345' } } }))
      };
      modalControllerSpy.create.and.returnValue(Promise.resolve(mockModal as any));
      await component.startScan();
      expect(component.scanResult).toBe('12345');
    });
  });
});
