import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from './canactivate.guard';
import { CanmatchGuard } from './canmatch.guard';
import { CanDeactivateGuard } from './candeactivate.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioPageModule),
    canActivate: [canActivate],
    canMatch: [CanmatchGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'restablecer-contrasena',
    loadChildren: () =>
      import('./restablecer-contrasena/restablecer-contrasena.module').then(
        (m) => m.RestablecerContrasenaPageModule
      ),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    canActivate: [canActivate],
    canMatch: [CanmatchGuard],
    canDeactivate: [CanDeactivateGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
